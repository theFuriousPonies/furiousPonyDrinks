const User = require('./user');
const Brand = require('./Brand');
const Drink = require('./Drink');
const Category = require('./Category');
const Order = require('./Order');
const Address = require('./Address');

Drink.belongsTo(Brand);
Brand.hasMany(Drink);

Drink.belongsToMany(Category, { through: 'drinkType' });
Category.hasMany(Drink, { through: 'drinkType' });

Order.belongsTo(User);
User.hasMany(Order);

User.belongsTo(Address);
Address.hasMany(User);

Order.belongsTo(Address);
Address.hasMany(Order);

module.exports = {
  User,
  Brand,
  Drink,
  Category,
  Order,
  Address,
};
