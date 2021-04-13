import React, { useEffect } from 'react';

import Product from "../components/Product";
import product1 from '../images/product1.jpeg';
import product2 from '../images/product2.jpeg';
import product3 from '../images/product3.jpeg';
import product4 from '../images/product4.jpeg';
import product5 from '../images/product5.jpeg';
import product6 from '../images/product6.jpeg';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {useDispatch, useSelector } from 'react-redux';
import {listProducts } from "../actions/productActions";

const assets = {
  product1,
  product2,
  product3,
  product4,
  product5,
  product6
}


export default function HomeScreen() {
const dispatch = useDispatch();
const productList = useSelector((state) => state.productList);
const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
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
