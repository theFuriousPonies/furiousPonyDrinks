const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  drinkId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = Item
