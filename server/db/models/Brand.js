const Sequelize = require('sequelize');
const db = require('../db');

const Brand = db.define('brand', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/img/defaultbrand.jpg',
  },
});

module.exports = Brand;
