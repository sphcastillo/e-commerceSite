import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from "../components/Product";
import product1 from '../images/product1.jpeg';
import product2 from '../images/product2.jpeg';
import product3 from '../images/product3.jpeg';
import product4 from '../images/product4.jpeg';
import product5 from '../images/product5.jpeg';
import product6 from '../images/product6.jpeg';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const assets = {
  product1,
  product2,
  product3,
  product4,
  product5,
  product6
}


export default function HomeScreen() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try{
        setLoading(true);
        const { data } = await axios.get('/api/products');
        setLoading(false);
        setProducts(data);
      }catch(err){
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [])



    return (
          <div>
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <div className="row center"> 
                {products.map((product) => {
                return <Product key={product._id} product={{...product, image: assets[product.image]}}></Product>
  
              })} 
              </div>              
            
            )}
          </div>

    )
}
