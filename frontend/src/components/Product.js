import React from "react";
import data from "./data";

export default function Product(props){
    const {product} = props;
    return(
        <div>
            <div key={product._id} className="card">
              <a href={`/product/${product._id}`}>
                <img className="medium" 
                src={product.image} 
                alt={product.name}
                />
              </a>
              <div className="card-body">
                <a href={`/product/${product._id}`}>
                  <h2>{product.name}</h2>
                </a>
                <div className="rating">
                  <span><i className="fa fa-star"></i></span>
                  <span><i className="fa fa-star"></i></span>
                  <span><i className="fa fa-star"></i></span>
                  <span><i className="fa fa-star"></i></span>                             
                </div>
                <div className="price">${product.price}</div>
              </div>  
            </div>             
        </div>
    )
}