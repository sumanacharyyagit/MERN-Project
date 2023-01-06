require("dotenv").config();
const User = require("../models/user");
const {check, body, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const {expressjwt: expressJwt} = require("express-jwt");

exports.signUp = (req, res) => {
    // console.log("REQ BODY: ", req.body);
    // res.json({
    //     messaeg: "User Signup Success",
    // })

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
            param: errors.array()[0].param,
        });
    }

    const user = new User(req.body);
    user.save((err, user) => {
        if(err){
            console.log(err);
            return res.status(400).json({
                error: "Not able to save the data"
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id,
        });
    });
};

exports.signIn = (req, res) => {
    /* 
    TEST USER::::::::::::
    {
        "email": "suman@suman-dev.in",
        "password": "password123"
    }
    */
    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.sattus(422).json({
            error: errors.array[0].msg,
        });
    }

    const {email, password} = req.body;
    User.findOne({email}, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User does not exists",
            });
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and Password not matched",
            });
        }
        // CREATE JWT TOKEN
        const authToken = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET);
        // Put TOKEN in COOKIE
        res.cookie("token", authToken, {expire: new Date() + 9990});

        // Send RESPONSE to FrontEnd
        const {_id: id, name, email, role} = user;
        return res.json({
            token: authToken,
            user: {id, name, email, role},
        })
    });
};

exports.signOut = (req, res) => {
    res.clearCookie("token");
    res.json({messaeg: "User SignOut Success"});
};


// Protected Routes
exports.isSignedIn = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    // userProperty: "auth"
});

// Custom Middlewares
exports.isAuthenticated = (req, res, next) => {
    const checker = req.profile && req.auth && req.profile.id == req.auth.id
    if(!checker){
        return res.status(403).json({
            error: "ACCESS DENIED",
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.sattus(403).json({
            error: "NOT AN ADMIN",
        });
    }
    next();
};

