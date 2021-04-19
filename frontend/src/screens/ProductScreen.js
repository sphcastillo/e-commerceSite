import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { detailsProduct } from "../actions/productActions";
import Rating from '../components/Rating';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

import product1 from '../images/product1.jpeg';
import product2 from '../images/product2.jpeg';
import product3 from '../images/product3.jpeg';
import product4 from '../images/product4.jpeg';
import product5 from '../images/product5.jpeg';
import product6 from '../images/product6.jpeg';

const assets = {
    product1,
    product2,
    product3,
    product4,
    product5,
    product6
  }

export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector( (state) => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    useEffect(()=> {
        console.log(product)
    }, [product])

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    }

    return (
        <div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
            <div>
                <Link to="/">Back to result</Link>
                <div className="row top">
                    <div className="col-2">
                        <img 
                            className="large" 
                            src={assets[product.image]} 
                            alt={product.name}
                        ></img>
                    </div>
                    <div className="col-1">
                        <ul>
                            <li>
                                <h1>{product.name}</h1>
                            </li>
                            <li>
                                <Rating
                                    rating={product.rating}
                                    numReviews={product.numReviews}
                                ></Rating>
                            </li>
                            <li>
                                Price: ${product.price}
                            </li>
                            <li>
                                Description:
                                <p>{product.description}</p>
                            </li>
                        </ul>
                    </div>
                    <div className="col-1">
                        <div className="card card-body">
                            <ul>
                                <li>
                                    <div className="row">
                                        <div>Price</div>
                                        <div className="price ">${product.price}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Status</div>
                                        <div>
                                            {product.countInStock>0? (
                                                <span className="success">In Stock</span>
                                            ):(
                                                <span className="danger">Unavailable</span>
                                            )}
                                        </div>
                                    </div>
                                </li>
                                {product.countInStock > 0 && (
                                        <>
                                            <li>
                                                <div className="row">
                                                    <div>Qty</div>
                                                    <div>
                                                        <select value={qty} onChange={e => setQty(e.target.value)}>
                                                            {
                                                                [...Array(product.countInStock).keys()].map( 
                                                                    (x) => (
                                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                                )
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <button 
                                                    onClick={addToCartHandler}
                                                    className="primary block"
                                                >
                                                Add to Cart
                                                </button>
                                            </li>
                                        </>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>

    );
}
