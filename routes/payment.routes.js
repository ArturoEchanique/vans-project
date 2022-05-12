const router = require("express").Router()
const Stripe = require("stripe");
const stripe = new Stripe("sk_test_51KwTPNGY00AWRT2Zg3lK6oZsLUyexpM7F3wZ8xaX3LDeVtHyAfUY30aw9bNrU34QfWU5T17xzKwoA0jN4p9pbe8w00iwnBIzqK");



router.post('/', async (req, res) => {
    const { id, amount } = req.body;

    const payment = await stripe.paymentIntents.create({
        amount: amount,
        currency: "USD",
        description: "Amazing Van",
        payment_method: id,
        confirm: true, //confirm the payment at the same time
    });

    console.log(payment)

    return res.status(200).json({ message: "Successful Payment" });
})





module.exports = router