import React, { useEffect, useState } from 'react';
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/cartHelper';
import StripeCheckout from './StripeCheckout';

const Cart = () => {

    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart())
    }, [reload]);
    

    const loadAllProducts  =() => {
        return(
            <div>
                <h2>
                    This section is to Load Products
                </h2>
                {
                    products.map((product, index) =>(
                        <Card 
                            key={index}
                            product={product}
                            addToCartBool={false}
                            removeFromCartBool={true}
                            reload={reload}
                            setReload={setReload}
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
            <div className="col-6" >
                <StripeCheckout products={products} setReload={setReload} reload={reload} />
            </div>
        </div>
    </Base>
  )
}

export default Cart;