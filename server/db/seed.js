const db = require('./index')

const {
  Order,
  Address,
  Brand,
  Category,
  Drink,
  User,
  Item
} = require('./models')

// Rows for tables
const categories = [
  {
    name: 'Dairy'
  },
  {
    name: 'Soft Drink'
  },
  {
    name: 'Juice'
  },
  {
    name: 'Beer'
  },
  {
    name: 'Alcohol'
  },
  {
    name: 'Water'
  },
  {
    name: 'Diet'
  }
]

const brands = [
  {
    name: 'Coca-cola',
    description: 'The king of all drinks',
    imageUrl:
      'https://yt3.ggpht.com/a-/ACSszfGWvFjr4gb1ocKes4p-QHqowwLMz2loBWddxg=s900-mo-c-c0xffffffff-rj-k-no'
  },
  {
    name: 'Fiji',
    description: 'the king of all waters',
    imageUrl: 'https://i.ytimg.com/vi/juHtVC60Kuo/maxresdefault.jpg'
  },
  {
    name: 'Pepsi',
    description: 'The pleib drink',
    imageUrl: 'https://abasto.com/wp-content/uploads/2016/10/pepsico.jpg'
  }
]

const drinks = [
  {
    name: 'Diet Coke',
    flavor: 'coca-cola',
    price: '1000',
    description: 'The best most quenche thirsting beverage ever',
    size: 12,
    tag: ['soft-drink', 'diet', 'zero caleries', 'coca-cola'],
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/81yC2KnOZuL._SL1500_.jpg',
    inventory: 100,
    packageSize: 1
  },
  {
    name: 'Regular Coke',
    flavor: 'coca-cola',
    price: '1000',
    description: 'The best most quenche thirsting beverage ever',
    size: 12,
    tag: ['soft-drink', 'diabetes', 'sugar', 'coca-cola'],
    imageUrl:
      'http://i.dailymail.co.uk/i/pix/2014/08/03/article-2714836-1D21323A00000578-220_306x510.jpg',
    inventory: 100,
    packageSize: 1
  },
  {
    name: 'Coke Zero',
    flavor: 'coca-cola',
    price: '1000',
    description: 'The best most quenche thirsting beverage ever',
    size: 12,
    tag: ['soft-drink', 'diet', 'zero caleries', 'coca-cola'],
    imageUrl:
      'https://www.poundstretcher.co.uk/media/catalog/product/cache/1/image/686x/9df78eab33525d08d6e5fb8d27136e95/c/o/coke-zero-241418.jpg',
    inventory: 100,
    packageSize: 1
  },
  {
    name: 'Nuke-a-Cola',
    flavor: 'radioactive delight',
    price: '100000',
    description: `Side Effects include:
      Green Tongue,
      Diziness,
      Scaley Skin`,
    size: 12,
    tag: ['nuclear', 'green', 'zero caleries', 'radioactive'],
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61ZgOE7lVEL._SL1132_.jpg',
    inventory: 100,
    packageSize: 1
  }
]

const orders = [
  {
    total: 100,
    shippingMethod: 'Royal Mail',
    status: true
  },
  {
    total: 1000,
    shippingMethod: 'Fedex',
    status: true
  },
  {
    total: 102,
    shippingMethod: 'Owl',
    status: false
  },
  {
    total: 103,
    shippingMethod: 'DHL',
    status: true
  },
  {
    total: 1,
    shippingMethod: 'US Mail',
    status: true
  }
]

const addresses = [
  {
    street: 'Pennsylvania Ave NW',
    number: 1600,
    city: 'Washington DC',
    zipCode: '20500',
    country: 'USA'
  },
  {
    street: 'Fulton St',
    number: 285,
    city: 'New York',
    zipCode: '10007',
    country: 'USA'
  },
  {
    street: 'Downing St, Westminster',
    number: 10,
    city: 'London',
    zipCode: 'SW1A 2AA',
    country: 'UK'
  },
  {
    street: 'Westminster',
    number: 1,
    city: 'London',
    zipCode: 'SW1A 1AA',
    country: 'UK'
  }
]

const users = [
  {
    name: 'Blake',
    email: 'blake@gmail.com',
    password: 'chicken'
  },
  {
    name: 'Chloe',
    email: 'chloe@gmail.com',
    password: 'chicken'
  },
  {
    name: 'Kirk',
    email: 'kirk@gmail.com',
    password: 'chicken'
  },
  {
    name: 'Sean',
    email: 'sean@gmail.com',
    password: 'chicken'
  },
  {
    name: 'Jake',
    email: 'jake@gmail.com',
    password: 'chicken'
  },
  {
    name: 'Jill',
    email: 'jill@gmail.com',
    password: 'chicken'
  }
]

const items = [
  {
    quantity: 1,
    drinkId: 1,
    orderId: 1
  },
  {
    quantity: 5,
    drinkId: 1,
    orderId: 2
  },
  {
    quantity: 7,
    drinkId: 2,
    orderId: 2
  },
  {
    quantity: 10,
    drinkId: 2,
    orderId: 1
  },
  {
    quantity: 2,
    drinkId: 3,
    orderId: 1
  },
  {
    quantity: 1,
    drinkId: 3,
    orderId: 3
  },
  {
    quantity: 4,
    drinkId: 1,
    orderId: 4
  },
  {
    quantity: 1,
    drinkId: 4,
    orderId: 1
  }
]
// seedScript function

const seedScript = async () => {
  try {
    console.log('syncing db')
    await db.sync({ force: true })
    console.log('db synced')
    // Creating the rows
    const createdAddresses = await Address.bulkCreate(addresses, {
      returning: true
    })
    const createdBrands = await Brand.bulkCreate(brands, {
      returning: true
    })
    const createdCategories = await Category.bulkCreate(categories, {
      returning: true
    })
    const createdDrinks = await Drink.bulkCreate(drinks, {
      returning: true
    })
    const createdOrders = await Order.bulkCreate(orders, {
      returning: true
    })
    const createdUsers = await User.bulkCreate(users, {
      returning: true
    })

    const createdItems = await Item.bulkCreate(items, {
      returning: true
    })
    console.log('hello')
    // Assocciations setting Id's

    //setting Brands on Drinks
    const settingBrandsDrinks = Promise.all([
      createdDrinks[0].setBrand(createdBrands[0]),
      createdDrinks[1].setBrand(createdBrands[1]),
      createdDrinks[2].setBrand(createdBrands[2]),
      createdDrinks[3].setBrand(createdBrands[0])
    ])
    // setting Many to Many with Drink and Category
    // I don't know how to do this
    // const settingDrinksCategories = Promise.all([
    //   createdDrinks[0].setCateogies([
    //     createdCategories[0],
    //     createdCategories[1],
    //     createdCategories[2]
    //   ]),
    //   createdDrinks[1].setCateogies([
    //     createdCategories[2],
    //     createdCategories[3],
    //     createdCategories[4]
    //   ]),
    //   createdDrinks[2].setCateogies([
    //     createdCategories[2],
    //     createdCategories[3],
    //     createdCategories[5]
    //   ]),
    //   createdDrinks[3].setCateogies([
    //     createdCategories[0],
    //     createdCategories[3],
    //     createdCategories[6]
    //   ])
    // ])

    // setting User to Order
    const settingUserOrder = Promise.all([
      createdOrders[0].setUser(createdUsers[0]),
      createdOrders[1].setUser(createdUsers[1]),
      createdOrders[2].setUser(createdUsers[2]),
      createdOrders[3].setUser(createdUsers[3]),
      createdOrders[4].setUser(createdUsers[4])
    ])

    // setting Address to Order
    const settingAddressesOrder = Promise.all([
      createdOrders[0].setAddress(createdAddresses[0]),
      createdOrders[1].setAddress(createdAddresses[1]),
      createdOrders[2].setAddress(createdAddresses[2]),
      createdOrders[3].setAddress(createdAddresses[3]),
      createdOrders[4].setAddress(createdAddresses[0])
    ])

    // setting Drink to Item
    // const settingItemsDrinks = Promise.all([
    //   createdItems[0].setDrink(createdDrinks[0]),
    //   createdItems[1].setDrink(createdDrinks[1]),
    //   createdItems[2].setDrink(createdDrinks[2]),
    //   createdItems[3].setDrink(createdDrinks[3]),
    //   createdItems[4].setDrink(createdDrinks[0]),
    //   createdItems[5].setDrink(createdDrinks[1]),
    //   createdItems[6].setDrink(createdDrinks[2]),
    //   createdItems[7].setDrink(createdDrinks[3])
    // ])

    // await the promises
    await Promise.all([
      settingAddressesOrder,
      settingBrandsDrinks,
      settingUserOrder
      // settingItemsDrinks
      // settingDrinksCategories
    ])
  } catch (error) {
    console.log(error)
  } finally {
    console.log('shutting db connection down')
    db.close()
    console.log('db closed')
  }
}

seedScript()
