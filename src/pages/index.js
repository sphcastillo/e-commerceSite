import { getSession } from "next-auth/react";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";  
import ProductFeed from "../components/ProductFeed";                

export default function Home({ products }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      <Header />

      <main className="max-w-screen-2xl mx-auto">

        <Banner />

        <ProductFeed products={products} />
      </main>
    </div>
  );
}

// by having this function... this tells NEXT.JS /// 
// this is no longer a static page
// needs to have the middle server step
// calculate something on the server first, render out the page and then send it to the browser

export async function getServerSideProps(context){

  const products = await fetch('https://fakestoreapi.com/products').then(
      (res) => res.json()
  );

  return { 
      props: {

          products,
      }
  }
}

// GET >>> https://fakestoreapi.com/products