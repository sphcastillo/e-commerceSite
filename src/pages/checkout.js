import React from 'react';
import Header from '../components/Header';
import Image from "next/image";
import { useSelector } from 'react-redux';
import { selectItems, selectTotal } from '../slices/basketSlice';    
import CheckoutProduct from '../components/CheckoutProduct';
import Currency from "react-currency-formatter";
import { useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
    // pulling items from the global store
    const items = useSelector(selectItems);
    const {data: session} = useSession();   
    const total = useSelector(selectTotal);

    const createCheckoutSession = async () => {
        // load stripe
        const stripe = await stripePromise;

        // call the backend to create a checkout session...
        const checkoutSession = await axios.post("/api/create-checkout-session", 
        {
            items,
            email: session.user.email,
        });

        // redirect user/customer to stripe checkout
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        })

        if (result.error) {
            alert(result.error.message);
        }

    };

    return (
        <div className="bg-gray-100">
            <Header />
            <main className="lg:flex max-w-screen-2xl mx-auto">
                {/* Left */}
                <div className="flex-grow m-5 shadow-sm">
                    <Image 
                        src="https://links.papareact.com/ikj" 
                        width={1020}
                        height={250}
                        objectFit="contain"
                    />

                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <h1 className='border-b pb-4 text-3xl'>
                            {items.length === 0 ? "Your Amazon Basket is empty." 
                            : "Shopping Basket"}
                        </h1>

                        {items.map((item, i) => (
                            <CheckoutProduct 
                                key={i}
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                rating={item.rating}
                                description={item.description}
                                category={item.category}
                                image={item.image}
                                hasPrime={item.hasPrime}
                                />
                        ))}
                    </div>
                </div>



                {/* Right */}
                <div className="flex flex-col bg-white p-10 shadow-md">
                    {items.length  > 0 && (
                        <>
                            <h2 className='whitespace-nowrap'>
                                Subtotal ({items.length} items):{" "}
                                <span className="font-bold">
                                    <Currency 
                                        quantity={total}
                                        currency="USD"
                                    />
                                </span>
                            </h2>

                            <button 
                                onClick={createCheckoutSession}
                                role="link"
                                disabled={!session}
                                className={`button mt-2 ${!session && "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"}`}
                            >
                                {!session ? "Sign in to checkout" : "Proceed to checkout"}
                            </button>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Checkout;