const router = require('express').Router()
const { User, Order } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(next)
})

router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    res.json(newUser)
  } catch (error) {
    next(error)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.userId
      }
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
