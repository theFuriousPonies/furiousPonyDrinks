const router = require('express').Router()
const { Drink, Brand } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log('req.user.dataValues', req.user.dataValues)

    const brands = await Brand.findAll({ include: [Drink] })
    res.json(brands)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const brand = await Brand.create(req.body)
      res.json(brand)
    } else {
      res.redirect('/')
    }
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
    if (req.user && req.user.isAdmin) {
      const [_, brand] = await Brand.update(req.body, {
        returning: true,
        where: {
          id: req.params.brandId
        }
      })
      res.send(brand[0].dataValues)
    } else {
      res.redirect('/')
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:brandId', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      await Brand.destroy({
        where: {
          id: req.params.brandId
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
