const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  total: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  shippingMethod: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Order
