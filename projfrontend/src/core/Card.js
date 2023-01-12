import React, { useEffect, useState } from 'react'
import ImageHelper from './helper/ImageHelper';
import { Navigate } from 'react-router-dom';
import { addItemToCart } from './helper/cartHelper';

const Card = ({product,
    addToCartBool = true,
    removeFromCartBool = false,
}) => {

    const [redirect, serRedirect] = useState(false);
    const [count, serCount] = useState(product.count);

    useEffect(()=> {

    }, []);

    const cartTitle = product?.name ? product.name : "A photo from pexels";
    const cartDescription = product?.description ? product.description : "This photo looks great";
    const cartPrice = product?.price ? `$ ${product.price}` : "$ 5";

    const getRedirect = (redirect) => {
        if(redirect){
            return <Navigate to="/cart" />;
        }
    };

    const addToCart = () => {
        addItemToCart(product, () => {
            serRedirect(true);
        });
    }


    const showAddToCart = (addToCartBool) => {
        return(
            addToCartBool && (
                <button 
                    className="btn btn-block btn-outline-success mt-2 mb-2" 
                    onClick={addToCart}
                >
                        Add to Cart
                </button>
                )
        )
    };

    const showRemoveFromCart = (removeFromCartBool) => {
        return (
            removeFromCartBool && (
                <button 
                    className="btn btn-block btn-outline-danger mt-2 mb-2" 
                    onClick={() => {}}
                >   
                    Remove from Cart
                </button>
            )
        )
        };


  return (
    <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cartTitle}</div>
        <div className="card-body">
            {getRedirect(redirect)}
            <ImageHelper product={product} />
            <p className="lead bg-success font-weight-bold fs-3 text-wrap mt-3 ">
            {cartDescription}
            </p>
            <p className="btn btn-success rounded  btn-sm px-4">{cartPrice}</p>
            <div className="d-grid gap-2">
                {showAddToCart(addToCartBool)}
                {showRemoveFromCart(removeFromCartBool)}
                
            </div>
            
        </div>
    </div>
    );
}

export default Card;
