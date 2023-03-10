import {API} from "../../backend";


export const signUp = (user) => {
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",  
        },
        body: JSON.stringify(user),
    })
    .then((resp) => {
        return resp.json();
    })
    .catch((err) => {
        console.log(err);
    })
};

export const signIn = (user) => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",  
        },
        body: JSON.stringify(user),
    })
    .then((resp) => {
        return resp.json();
    })
    .catch((err) => {
        console.log(err);
    })
};

export const authenticate = (data, next) => {
    if(typeof window !== "undefined") {
        localStorage.setItem("jwtAuthent", JSON.stringify(data))
        next();
    }
};

export const signOut = (next) => {
    if(typeof window !== "undefined") {
        localStorage.removeItem("jwtAuthent");
        next();
        return fetch(`${API}/signout`, {
            method: "GET",
        })
        .then((resp) => {
            console.log(resp);
        })
        .catch((err) => {
            console.log(err);
        });
    }
};

export const isAuthenticated = () => {
    if(typeof window == "undefined") { 
        return false;
    }
    if(localStorage.getItem("jwtAuthent")){
        return JSON.parse(localStorage.getItem("jwtAuthent"));
    }else{
        return false;
    }
};
