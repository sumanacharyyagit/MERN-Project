import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../auth/helper';
import { Link, json } from 'react-router-dom';
import StripeCheckoutComponent from "react-stripe-checkout";
import { API } from '../backend';
import { cartEmpty } from './helper/cartHelper';
import { createOrder } from './helper/orderHelper';

const StripeCheckout = ({
    products,
    reload = undefined,
    setReload = (func) => func,
}) => {

    const [Data, setData] = useState({
        loading: false,
        success: false,
        errro: "",
        address: "",
    });

    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user.id;

    useEffect(() => {

    }, []);


    const getFinalPrice = () => {
        return products.reduce((currentVal, nextVal) => {
            return currentVal + nextVal.count * nextVal.price;
        }, 0);
    };

    const makePayment = (token) => {
        return fetch(`${API}/stripe-payment`, {
            method: "POST",
            headers: {
                "COntent-Type": "application/json",
            },
            body: JSON.stringify({
                token, 
                products,
            }),
        }).then((resp) => {
            console.log(resp);
            // CALL FURTHER METHODS
            const {status} = resp;
            console.log("STATUS --> ",status);
            const orderData = {
                products: products,
                transaction_id: resp.transaction.id,
                amount: resp.transaction.amount,
            };
            createOrder(userId, token, orderData);
            cartEmpty(() => {
                console.log("Got a crash, in payments!");
            });
            setReload(!reload);
        }).catch((err) => {
            console.log(err);
        })
    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckoutComponent
                stripeKey="pk_test_51KtDQbSEwPlsw9xEk35dum9i09rQDViaT048LGS2KlaTGF7x2C1RPWMjr05h0rOtwtPwtVkQyixpd1fRwvV4sZKe00vWqNzRbB"
                token={() => makePayment(token)}
                amount={getFinalPrice() * 100}
                name="Buy T-Shirts" 
                shippingAddress
                billingAddress
            >
                <button className="btn btn-success">Pay with Stripe</button>
            </StripeCheckoutComponent>
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning">SignIn to proceed</button>
            </Link>
        )
    }


  return (
    <div>
        <h3 className="text-white">Stripe CheckOut Loaded: {getFinalPrice()}</h3>
        {showStripeButton()}
    </div>
  )
};

export default StripeCheckout;