import React, { useEffect, useState } from 'react';
import { API } from '../backend';
import Base from './Base';
import Card from './Card';
import { getProducts } from './helper/coreapicalls';


console.log(process.env);
console.log(API);

const Home = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);


    useEffect(() => {
        loadAllProducts()
    }, []);

    const loadAllProducts = () => [
        getProducts().then((resp) => {
            if(resp.error){
                setError(resp.error);
            }
            else{
                setProducts(resp);
            }
        })
    ]

  return (
    <Base title="Home Page" description="Welcome to the T-Shirt Store">
        <div className="row text-center">
            <h1 className="text-white">All of T-Shirts</h1>
            <div className="row">
                {
                    products.length > 0 && products.map((product) =>(
                        <div key={product._id} className="col-4 mb-4">
                            <Card product={product}/> 
                        </div>
                    ))
                }
            </div>
        </div>
    </Base>
  )
}

export default Home;