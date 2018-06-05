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

router.get('/:brandId', async (req, res, next) => {
  try {
    const brand = await Brand.findbyId(req.params.brandId)
    res.json(brand)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const [brand] = await Brand.findOrCreate({
      where: {
        id: req.body.id
      }
    })
    res.json(brand)
  } catch (err) {
    next(err)
  }
})

router.put('/:brandId', async (req, res, next) => {
  try {
    const [_, brand] = await Brand.update(req.body, {
      where: {
        id: req.params.brandId
      }
    })
    res.send(brand)
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
    }).then(_ => res.status(204).end())
  } catch (err) {
    next(err)
  }
})
