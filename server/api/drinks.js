const router = require('express').Router()
const { Drink, Brand, Category } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const data = await Drink.findAll()
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newDrink = await Drink.create(req.body)
    res.json(newDrink)
  } catch (error) {
    next(error)
  }
})

router.put('/:drinkId', async (req, res, next) => {
  try {
    const [_, drink] = await Drink.update(req.body, {
      returning: true,
      where: {
        id: req.params.drinkId
      }
    })
    res.send(drink[0].dataValues)
  } catch (error) {
    next(error)
  }
})

router.delete('/:drinkId', async (req, res, next) => {
  try {
    await Drink.destroy({
      where: {
        id: req.params.drinkId
      }
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
