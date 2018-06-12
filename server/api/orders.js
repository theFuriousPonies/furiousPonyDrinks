const router = require('express').Router()
const { Order, Drink } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      order: [['id', 'DESC']]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const order = await Order.create(req.body, {
        include: [{ model: Drink }]
      }).then(result => result.setUser(req.params.userId))
      res.json(order)
    } else {
      res.redirect('/')
    }
  } catch (err) {
    next(err)
  }
})

//  /:orderId routes
router.get('/:orderId', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const order = await Order.findById(req.params.orderId, {
        include: [{ model: Drink }]
      })
      res.json(order)
    } else {
      res.redirect('/')
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const [_, order] = await Order.update(req.body, {
        returning: true,
        where: { id: req.params.orderId },
        include: [{ model: Drink }]
      })
      res.send(order)
    } else {
      res.redirect('/')
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:orderId', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      await Order.destroy({
        where: {
          id: req.params.orderId
        }
      })
      res.status(204).end()
    } else {
      res.redirect('/')
    }
  } catch (err) {
    next(err)
  }
})
