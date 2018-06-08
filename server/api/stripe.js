const stripe = require('stripe')('sk_test_jHXyTXBJqigeT3bsa7QekdXT')
const router = require('express').Router()
module.exports = router

router.post('/', (req, res, next) => {
  let token = req.body.stripeToken
  let chargeAmount = req.body.chargeAmount
  let charge = stripe.charges.create(
    {
      amount: chargeAmount,
      currency: 'usd',
      source: token
    },
    (err, charge) => {
      if (err && err.type === 'StripeCardError') {
        console.log('Your card was declined')
      } else {
        console.log(
          'Your payment was successful Now selling your info on the dark web hahahah'
        )
        res.send('Success')
      }
    }
  )
})
