const router = require('express').Router()
const { Item, Order, Drink } = require('../db/models')
module.exports = router

router.get('/:orderId', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
