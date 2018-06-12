const router = require('express').Router()
const { User, Order, Address } = require('../db/models')
module.exports = router
const errorNaughty = new Error('naughty')

router.get('/', (req, res, next) => {
  console.log(req.user)
  if (req.user && req.user.isAdmin) {
    User.findAll({ include: [Address] })
      .then(users => res.json(users))
      .catch(next)
  } else {
    next(errorNaughty)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const newUser = await User.create(req.body)
      res.json(newUser)
    } else {
      next(errorNaughty)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      const [_, user] = await User.update(req.body, {
        returning: true,
        include: [
          {
            model: Order
          }
        ],
        where: {
          id: req.params.userId
        }
      })
      res.send(user[0].dataValues)
    } else {
      next(errorNaughty)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      await User.destroy({
        where: {
          id: req.params.userId
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
