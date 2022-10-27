import { buffer } from 'micro';
import * as admin from 'firebase-admin';

// Secure a conneciton to FIREBASE from the backend
const serviceAccount = require("../../../permissions.json");


// if there is no app already inintialized, ... want to initialize App
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app();
// or use admin app already configured

// Establish connection to Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fullfillOrder = async (session) => {
    console.log("Fulfilling order: ", session);
    // connect to FIRESTORE DB 
    return app.firestore()
}

export default async (req, res) => {
    if(req.method === 'POST'){
        // how to verify this is a real event from Stripe
        const requestBuffer = await buffer(req);
        // generate a cerificate to verify the event
        const payload = requestBuffer.toString();
        // represent a signature 
        const sig =  req.headers['stripe-signature'];

        // the will be changed
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
        }
    }

};