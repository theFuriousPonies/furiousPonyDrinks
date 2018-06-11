const router = require('express').Router()
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
var stripe = require('stripe')("sk_test_jHXyTXBJqigeT3bsa7QekdXT");

// Token is created using Checkout or Elements!
// Get the payment token ID submitted by the form:


router.post('/', async (req, res, next) => {
  try {
    // console.log(req.body.id)
    const token = req.body;
    const charge = await stripe.charges.create({
      amount: 999,
      currency: 'usd',
      description: 'Example charge',
      source: "tok_visa",
    });
    console.log("CHARGE!!!!!\n", charge);

  } catch (error) {
   console.error(error)
  }
})

module.exports = router
