import { API } from "../../backend"


export const createOrder = (userId, token, orderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,        
        }, 
        body: JSON.stringify({order: orderData}),
    }).then((resp) => {
        return resp.json();
    }).catch((err) => {
        console.log(err);
    });
}