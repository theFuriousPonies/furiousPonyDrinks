const router = require('express').Router()
const { Category } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const category = await Category.create(req.body)
    res.json(category)
  } catch (err) {
    next(err)
  }
})

//  /:categoryId routes
router.get('/:categoryId', async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.categoryId)
    res.json(category)
  } catch (err) {
    next(err)
  }
})

router.put('/:categoryId', async (req, res, next) => {
  try {
    const [_, category] = await Category.update(req.body, {
      returning: true,
      where: {
        id: req.params.categoryId
      }
    })
    res.send(category)
  } catch (err) {
    next(err)
  }
})

router.delete('/:categoryId', async (req, res, next) => {
  try {
    await Category.destroy({
      where: {
        id: req.params.categoryId
      }
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
