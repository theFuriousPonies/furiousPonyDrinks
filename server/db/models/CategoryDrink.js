const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('categoryDrink', {
  // drinkId: Sequelize.INTEGER,
  // categoryId: Sequelize.INTEGER
})

module.exports = Item
