const router = require('express').Router()
const { Item } = require('../db/models')
module.exports = router

router.get('/:orderId', async (req, res, next) => {
  try {
    const items = await Item.findAll({
      where: { orderId: req.params.orderId },
      order: ['drinkId']
    })
    res.json(items)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { drinkId, orderId, quantity } = req.body
    const item = await Item.findOne({ where: { drinkId, orderId } }).then(
      foundItem => {
        if (foundItem) {
          if (quantity) {
            return foundItem.update({ quantity })
          } else {
            foundItem.destroy()
          }
        } else {
          return Item.create(req.body)
        }
      }
    )
    res.json(item)
  } catch (err) {
    next(err)
  }
})

router.post('/:drinkId', async (req, res, next) => {
  try {
    const { orderId, quantity } = req.body
    const drinkId = req.params.drinkId
    const item = await Item.findOne({ where: { drinkId, orderId } }).then(
      foundItem => {
        if (foundItem) {
          const newQuantity = foundItem.quantity + quantity
          return foundItem.update({ quantity: newQuantity })
        } else {
          return Item.create(req.body)
        }
      }
    )
    res.json(item)
  } catch (err) {
    next(err)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    await Item.destroy({ where: req.body })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
