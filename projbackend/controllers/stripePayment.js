const stripe = require("stripe")("sk_test_51KtDQbSEwPlsw9xEDpzGAClyAxZWTmTca6Luft7sdzhpdTvYliO40eXQhl3UrFSKqyRHpNWah3P2W5ozeEbWHvCy00QeyInBFt");
const { v4: uuid } = require('uuid');

exports.makePayment = (req, res) => {
    const { products, token } = req.body;
    console.log(products);

    let amount = products.reduce((currentVal, nextVal) => {
        return currentVal + nextVal.count * nextVal.price;
    }, 0);

    const idempotencyKey = uuid();

    return stripe.customers.create({
        eamil: token.email,
        source: token.id,
    }).then((cust) => {
        console.log(token);
        stripe.charges.create({
            amount: amount*100,
            currency: "usd",
            customer: cust.id,
            receipt_email: token.email,
            description: "Test payment",
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip,
                }
            },
        }, {idempotencyKey})
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
        })
    })
}