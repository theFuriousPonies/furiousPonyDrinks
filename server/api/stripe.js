const router = require('express').Router()
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
var stripe = require('stripe')('sk_test_jHXyTXBJqigeT3bsa7QekdXT')

router.post('/', async (req, res, next) => {
  try {
    const { token, total } = req.body
    console.log('Get the total from Token OMG',token)
    const charge = await stripe.charges.create({
      amount: total,
      currency: 'usd',
      description: 'Example charge',
      source: token
    })
    res.json(charge.status)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
