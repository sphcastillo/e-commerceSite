import React from 'react';
import Product from './Product';

function ProductFeed({ products }) {
    return (
        <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto'>

            {products.map((product, i) => {
                return <Product 
                            key={i}
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            description={product.description}
                            category={product.category}
                            image={product.image}
                            />
            })
            }

            {/* {products
                .map((product, i) =>  (
                <Product 
                    key={i}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    description={product.description}
                    category={product.category}
                    image={product.image}
                />
            ))} */}

            <img className='md:col-span-full' src="https://links.papareact.com/dyz" alt="" /> 


            {/* <div className="md:col-span-2 xl:col-span-2">
                {products
                    .slice(4, 5)
                    .map(({ id, title, price, description, category, image}) =>  (
                    <Product 
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                    />
                ))}
            </div> */}

            {/* {products
                .slice(5, products.length)
                .map(({ id, title, price, description, category, image }) =>  (
                <Product 
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    description={description}
                    category={category}
                    image={image}
                />
            ))} */}
        </div>
    )
}

export default ProductFeed;

