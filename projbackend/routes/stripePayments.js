const express = require('express');
const router = express.Router();
const stripe = require("stripe");
const {makePayment} = require("../controllers/stripePayment");

router.post("/stripe-payment", makePayment)

module.exports = router;