import React, { useEffect, useState } from 'react';
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/cartHelper';

const Cart = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(loadCart())
    }, []);
    

    const loadAllProducts  =() => {
        return(
            <div>
                <h2>
                    This section is to Load Products
                </h2>
                {
                    products.map((product) =>(
                        <Card 
                            key={product._id}
                            product={product}
                            addToCartBool={false}
                            removeFromCartBool={true}
                        />
                    ))
                }
            </div>
        )
    }
    
    
    const loadCheckOut=() => {
        return(
            <div>
                <h2>
                    This section for Checkout Products
                </h2>
            </div>
        )
    }

  return (
    <Base title="Cart Page" description="Ready to Checkout">
        <div className="row text-center">
            <div className="col-6" >{loadAllProducts()}</div>
            <div className="col-6" >{loadCheckOut()}</div>
        </div>
    </Base>
  )
}

export default Cart;