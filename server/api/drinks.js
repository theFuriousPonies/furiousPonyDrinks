const router = require('express').Router()
const {Drink, Brand, Category} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Drink.findAll()
    .then(users => res.json(users))
    .catch(next)
})