const {
  db,
  Order,
  Address,
  Brand,
  Category,
  Drink,
  User,
  Item
} = require('./index')

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
    status: 'complete'
  },
  {
    total: 1000,
    shippingMethod: 'Fedex',
    status: 'cart'
  },
  {
    total: 102,
    shippingMethod: 'Owl',
    status: 'pending'
  },
  {
    total: 103,
    shippingMethod: 'DHL',
    status: 'complete'
  },
  {
    total: 1,
    shippingMethod: 'US Mail',
    status: 'cart'
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

const items = [
  {
    quantity: 1
  },
  {
    quantity: 5
  },
  {
    quantity: 7
  },
  {
    quantity: 10
  },
  {
    quantity: 2
  },
  {
    quantity: 1
  },
  {
    quantity: 4
  },
  {
    quantity: 1
  }
]

const users = [
  {
    email: 'blake@gmail.com',
    password: 'chicken'
  },
  {
    email: 'chole@gmail.com',
    password: 'chicken'
  },
  {
    email: 'kirk@gmail.com',
    password: 'chicken'
  },
  {
    email: 'sean@gmail.com',
    password: 'chicken'
  },
  {
    email: 'jake@gmail.com',
    password: 'chicken'
  },
  {
    email: 'jill@gmail.com',
    password: 'chicken'
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
    const createdItems = await Item.bulkCreate(items, {
      returning: true
    })
    const createdOrders = await Order.bulkCreate(orders, {
      returning: true
    })
    const createdUsers = await User.bulkCreate(users, {
      returning: true
    })

    // Assocciations setting Id's

    //setting Brands on Drinks
    const settingBrandsDrinks = Promise.all([
      createdDrinks[0].setBrand(createdBrands[0]),
      createdDrinks[0].setBrand(createdBrands[1]),
      createdDrinks[0].setBrand(createdBrands[2]),
      createdDrinks[0].setBrand(createdBrands[0])
    ])
    // setting Many to Many with Drink and Category

    // setting User to Order
    const settingUserOrder = Promise.all([
      createdOrders[0].setUser(createdUsers[0]),
      createdOrders[0].setUser(createdUsers[1]),
      createdOrders[0].setUser(createdUsers[2]),
      createdOrders[0].setUser(createdUsers[3]),
      createdOrders[0].setUser(createdUsers[4])
    ])

    // setting Address to Order
    const settingAddressesOrder = Promise.all([
      createdOrders[0].setAddress(createdAddresses[0]),
      createdOrders[1].setAddress(createdAddresses[1]),
      createdOrders[2].setAddress(createdAddresses[2]),
      createdOrders[3].setAddress(createdAddresses[3]),
      createdOrders[4].setAddress(createdAddresses[0]),
      createdOrders[5].setAddress(createdAddresses[1])
    ])

    // setting Drink to Item
    const settingItemsDrinks = Promise.all([
      createdItems[0].setDrink(createdDrinks[0]),
      createdItems[1].setDrink(createdDrinks[1]),
      createdItems[2].setDrink(createdDrinks[2]),
      createdItems[3].setDrink(createdDrinks[3]),
      createdItems[4].setDrink(createdDrinks[0]),
      createdItems[5].setDrink(createdDrinks[1]),
      createdItems[6].setDrink(createdDrinks[2]),
      createdItems[7].setDrink(createdDrinks[3])
    ])
    // setting many to many order and item

    // await the promises
    await Promise.all([
      settingAddressesOrder,
      settingBrandsDrinks,
      settingUserOrder
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
