const mongoose = require('mongoose');
// import mongoose from 'mongoose';
const Crypto = require('crypto');
const {v4: uuidv4} = require('uuid');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 35,
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: 35,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    userinfo: {
        type: String,
        trim: true,

    },
    encry_password: {
        type: String,
        required: true,
    },
    salt: String,
    role: {
        type: Number,
        default: 0,
    },
    purchases: {
        type: Array,
        default: [],
    },

}, {timestamps: true});

userSchema.virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuidv4();
        this.encry_password = this.securePassword(password);
    })
    .get(function(){
        return this._password;
    })

userSchema.methods = {

    authenticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password;
    },

    securePassword: function(plainpassword){
        if(!plainpassword) return "";
        try {
            return Crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        } catch (err) {
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema);