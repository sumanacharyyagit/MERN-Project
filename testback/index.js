const express = require("express");

const app = express();
const PORT = 8000;


const admin = (req, res) => {
    return res.send("Admin Dashboard...!");
}

const isAdmin = (req, res, next) => {
    const admin = true;
    console.log("isAdmin is Running");
    if(admin){
        next();
    }else{
        return res.send("User Dashboard...!");
    }
};

const isLoggedIn = (req, res, next) => {
    const isLog = true;
    if(isLog){
        next();
    }else{
        console.log("user Not LoggedIn");
        return
    }
};

app.get("/", (req, res) => {
    return res.send("Home Page")
});
app.get("/login", (req, res) => {
    return res.send("Login Page")
});
app.get("/register", (req, res) => {
    return res.send("Register Page")
});
app.get("/admin", isLoggedIn, isAdmin, admin);
app.get("/signout", (req, res) => {
    return res.send("SignOut")
});

app.listen(PORT, (req, res) => {
    console.log(`PORT Listening at http://localhost:${PORT}`);
});