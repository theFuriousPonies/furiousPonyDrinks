const router = require('express').Router()
const { Order } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId', async (req, res, next) => {
  try {
    const order = await Order.findOrCreate({
      where: {
        userId: req.params.userId
      },
      defaults: req.body
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

//  /:orderId routes
router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId)
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId', async (req, res, next) => {
  try {
    const [_, order] = await Order.update(req.body, {
      returning: true,
      where: {
        id: req.params.orderId
      }
    })
    res.send(order)
  } catch (err) {
    next(err)
  }
})

router.delete('/:orderId', async (req, res, next) => {
  try {
    await Order.destroy({
      where: {
        id: req.params.orderId
      }
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
