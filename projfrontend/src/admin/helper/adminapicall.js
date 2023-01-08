import { API } from "../../backend";


// Category HTTP Calls
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category),
    }).then((resp) => {
        return resp.json();
    }).catch((err) => {
        console.log(err);
    });
};

// Get All Categories
export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET",
    })
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
};


// Products HTTP Calls
export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: product,
    }).then((resp) => {
        return resp.json();
    }).catch((err) => {
        console.log(err);
    });
};

// Get All Products
export const getProducts = () => {
    return fetch(`${API}/products`, {
        method: "GET",
    })
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
};

// Delete a Product
export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then((resp) => {
        return resp.json();
    }).catch((err) => {
        console.log(err);
    });
};

// Get a Product
export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET",
    })
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
};


// Update a Product
export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: product,
    }).then((resp) => {
        return resp.json();
    }).catch((err) => {
        console.log(err);
    });
};