// running on the server
// fetching from the endpoint
// ../api/create-checkout-session
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    // two variables from the request
    const { items, email } = req.body;
    console.log("items: ", items);
    console.log("email: ", email);


    };

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_rates: ['shr_1J5FZoK9ZuKjBQ5R8uV7wz5m'],
        shipping_address_collection: {
            allowed_countries: ['US', 'CA'],
        },
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map((item) => item.image)),
        },
    });

    res.status(200).json({ id: session.id });
};