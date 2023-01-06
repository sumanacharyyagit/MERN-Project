const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            res.status(401).json({
                error: "User not Exists",
            })
        }
        req.profile  = user;
        next();
    })
};

exports.getUser = (req, res) => {
    req.profile.encry_password = undefined;
    req.profile.salt = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
};

// exports.getAllUsers = (req, res) => {
//     User.find().exec((err, users) => {
//         if(err || !users){
//             return res.status(401).json({
//                 error: "No users found",
//             });
//         }
//         res.json(users);
//     });
// };


exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile.id },
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err, user) => {
            if(err){
                return res.status(400).json({
                    error: "Not Authorized to Update Data",
                });
            }
            user.encry_password = undefined;
            user.salt = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            res.json(user);
        }
    )
};

exports.userPurchaseList = (req, res) => {
    Order.find({user: req.profile.id})
    .populate("user", "id name email")
    .exec((err, order) => {
        if(err){
            return res.status(400).json({
                error: "No Order Found",
            });
        }
        return RTCRtpSender.json(order)
    })
};

exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = [];
    req.body.order.products.forEach(product => {
        purchases.push({
            id: product.id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id,
        });
    });

    // Store this in DB
    User.findOneAndUpdate(
        {id: req.profile.id},
        {$push: {purchases: purchases}},
        {new: true},
        (err, purchases) => {
            if (err) {
                return res.status(400).json({error: "Unable to Update Purchase List"})
            }
        }
    )

    next();
};