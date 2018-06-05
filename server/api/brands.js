const router = require('express').Router()
const {Drink, Brand} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const brands = await Brand.findAll({include: [Drink]})
    res.json(users)
  }
  catch (err){
    next(err)
  }
})

router.get('/:brandId', async (req, res, next) => {
  try {
    const brand = await Brand.findbyId(req.params.brandId)
    res.json(brand)
  }
  catch (err){
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
  }
  catch (err){
    next(err)
  }
})

router.put('/:brandId', async (req, res, next) => {
  try {
    const brand = Brand.update(req.body, {
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
    await Brand.destory({
      where: {
        id: req.params.brandId
      }
    })
    res.send(`deleted ${req.params.brandId}`)
  } catch (err) {
    next(err)
  }
})