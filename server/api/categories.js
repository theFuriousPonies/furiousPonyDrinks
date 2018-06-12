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
    if (req.user && req.user.isAdmin) {
      const category = await Category.create(req.body)
      res.json(category)
    } else {
      res.redirect('/')
    }
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
    if (req.user && req.user.isAdmin) {
      const [_, category] = await Category.update(req.body, {
        returning: true,
        where: {
          id: req.params.categoryId
        }
      })
      res.send(category)
    } else {
      res.redirect('/')
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:categoryId', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      await Category.destroy({
        where: {
          id: req.params.categoryId
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
