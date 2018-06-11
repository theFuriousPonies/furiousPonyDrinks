const Sequelize = require('sequelize')
const db = require('../db')

const Drink = db.define('drink', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  flavor: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  size: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  tag: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER
  },
  packageSize: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = Drink
