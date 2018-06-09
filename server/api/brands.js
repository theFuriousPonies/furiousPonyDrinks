const router = require('express').Router()
const { Drink, Brand } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const brands = await Brand.findAll({ include: [Drink] })
    res.json(brands)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const brand = await Brand.create(req.body)
    res.json(brand)
  } catch (err) {
    next(err)
  }
})

//  /:brandId routes
router.get('/:brandId', async (req, res, next) => {
  try {
    const brand = await Brand.findById(req.params.brandId)
    res.json(brand)
  } catch (err) {
    next(err)
  }
})

router.put('/:brandId', async (req, res, next) => {
  try {
    const [_, brand] = await Brand.update(req.body, {
      returning: true,
      where: {
        id: req.params.brandId
      }
    })
    res.send(brand[0].dataValues)
  } catch (err) {
    next(err)
  }
})

router.delete('/:brandId', async (req, res, next) => {
  try {
    await Brand.destroy({
      where: {
        id: req.params.brandId
      }
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
