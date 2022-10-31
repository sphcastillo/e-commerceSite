import React from 'react';
import Header from "../components/Header";
import { getSession, useSession } from "next-auth/react";
import db from "../../firebase";
import moment from "moment";
import Order from '../components/Order';

function YourOrders({ orders }) {

    const { data: session } = useSession();

    console.log("orders: ", orders);
    return (
        <div>
            <Header />

            <main className='max-w-screen-lg mx-auto p-10'>
                <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
                    Your Orders
                </h1>

                {session ? (
                    <h2>{orders?.length} orders</h2>
                ) : (
                    <h2>Please sign in to see your order</h2>
                )}

                <div className="mt-5 space-y-4">
                    {orders?.map(
                        ({ id, amount, amountShipping, items, timestamp, images})  =>  (
                            <Order 
                                key={id}
                                id={id}
                                amount={amount}
                                amountShipping={amountShipping}
                                items={items}
                                timestamp={timestamp}
                                images={images}
                            />
                        )
                    )}
                </div>
            </main>
        </div>
    )
}

export default YourOrders;


export async function getServerSideProps(context){

    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    const session = await getSession(context);

    // console.log("session in getServerSideProps", session);

    const sessionEmail = session.user.email;
    // console.log("session in getServerSideProps / sessionEmail: ", sessionEmail);

    if(!session)
        return {
            props: {}
        }

    const stripeOrders = await db
        .collection("users")
        .doc(sessionEmail)
        .collection("orders")
        .orderBy("timestamp", "desc")
        .get();
    
    
    const orders = await Promise.all(
        stripeOrders.docs.map(async (order) => (
                // console.log("ORDER LOGS: ", order.data()),
            {
                id: order.id,
                amount: order.data().amazon_total,
                amountShipping: order.data().fixedShipping_rate,
                images: order.data().images,
                timestamp: moment(order.data().timestamp.toDate()).unix(),
                items: (
                    await stripe.checkout.sessions.listLineItems(order.id, { limit: 100 })
                ).data,
            }
        ))

    
    )
    

    return {
        props: {
            orders,
        }
    }
}


