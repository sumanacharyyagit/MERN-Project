const mongoose = require("mongoose");


const {ObjectId} = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema(
    {
        product: {
            type: ObjectId,
            ref: "Product",
        },
        name: {type: String},
        count: Number,
        price: Number,
    },
    {timestamps: true},
);

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const OrderSchema = new mongoose.Schema(
    {
        products: [ProductCartSchema],
        transaction_id: {},
        amount: {
            type: Number,
        },
        address: String,
        updated: Date,
        status: {
            type: String,
            default: "Received",
            enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Received"],
        },
        user: {
            type: ObjectId,
            ref: "User",
        }
    }, 
    {timestamp: true},
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = {ProductCart, Order};