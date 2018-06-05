const router = require('express').Router()
const {Drink, Brand} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Brand.findAll({include: [Drink]})
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:brandId', (req, res, next) => {
  Drink.findAll({
    where: {brandId: req.params.brandId},
  })
    .then(users => res.json(users))
    .catch(next)
})