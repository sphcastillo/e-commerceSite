import { buffer } from 'micro';
import * as admin from 'firebase-admin';

// Secure a conneciton to FIREBASE from the backend
const serviceAccount = require("../../../permissions.json");


// if there is no app already initialized, ... want to initialize App
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app();
// or use admin app already configured

// Establish connection to Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

// TEST with command --> `stripe trigger payment_intent.created`

const fullfillOrder = async (session) => {
    console.log("Fulfilling order: ", session);
    // connect to FIRESTORE DB 
    return app
        .firestore()
        .collection("users")
        .doc(session.metadata.email)
        .collection("orders").doc(session.id).set({
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            customer_name: session.customer_details.name,
            customer_email: session.customer_details.email,
            customer_address: session.customer_details.address,
            total_amount: session.amount_total / 100,
            shipping_rate_price: session.total_details.amount_shipping / 100,
            images: JSON.parse(session.metadata.images),
            
        })
        .then(() => {
            console.log(`SUCCESS: Order ${session.id} has been added to the DB`)
        })
}

export default async (req, res) => {
    if(req.method === 'POST'){
        // how to verify this is a real event from Stripe
        const requestBuffer = await buffer(req);
        // generate a cerificate to verify the event
        const payload = requestBuffer.toString();
        // represent a signature 
        const sig =  req.headers['stripe-signature'];

        // this will be changed
        let event;

        // verify the event is from Stripe
        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (error) {

            console.log("There's a webhook ERROR: ", error.message);
            return res.status(400).send(`Webhook error: ${error.message}`);
        }

        // Handle the checkout.session.completed event
        // coming from the Stripe checkout
        if(event.type === 'checkout.session.completed'){
            // get the session object
            const session = event.data.object;

            // fullfill the order
            // pull out the data from the session
            // show your user / store the details in your database
            return fullfillOrder(session)
                .then(() => {
                    return res.status(200).send(`Webhook has been received`);
                })
                .catch((error) => {
                    return res.status(400).send(`Webhook error: ${error.message}`);
                })
        }
    }

};

export const config = {
    api: {
        // we want the request as a string and not an object
        // Disallow body parsing, consumes a stream 
        bodyParser: false,
        externalResolver: true,
    }
}