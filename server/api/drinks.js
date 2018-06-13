const router = require('express').Router()
const { Drink, Brand, Category } = require('../db/models')
module.exports = router
const errorNaughty = new Error('naughty')

router.get('/', async (req, res, next) => {
  try {
    const data = await Drink.findAll({
      include: [
        {
          model: Category
        }
      ]
    })
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const newDrink = await Drink.create(req.body)
      res.json(newDrink)
    } else {
      next(errorNaughty)
    }
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
    if (req.user && req.user.isAdmin) {
      await Drink.destroy({
        where: {
          id: req.params.drinkId
        }
      })
      res.status(204).end()
    } else {
      next(errorNaughty)
    }
  } catch (error) {
    next(error)
  }
})
