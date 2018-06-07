const { expect } = require('chai')
const db = require('../index')
const Address = require('./Address')
const Brand = require('./Brand')
const Category = require('./Category')
const Drink = require('./Drink')
const Item = require('./Item')
const Order = require('./Order')

describe('Models', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('Category tests', () => {
      let dairy
      beforeEach(() => {
        return Category.create({
          name: 'Dairy',
        }).then(category => {
          dairy = category
        })
      })

      describe('definition', () => {

        it('has proper definition attributes', () => {
            expect(Category.attributes.name).to.be.an('object');
        });
    })
})

describe('Brand tests', () => {
  let cocacola
  beforeEach(() => {
    return Brand.create({
      name: 'Coca-cola',
      description: 'The king of all drinks',
      imageUrl: 'https://yt3.ggpht.com/a-/ACSszfGWvFjr4gb1ocKes4p-QHqowwLMz2loBWddxg=s900-mo-c-c0xffffffff-rj-k-no'
    }).then(brand => {
      cocacola = brand
    })
  })

  describe('definition', () => {

    it('has proper definition attributes', () => {
        expect(Brand.attributes.name).to.be.an('object');
        expect(Brand.attributes.description).to.be.an('object');
        expect(Brand.attributes.imageUrl).to.be.an('object');
      });
    })
  })
  
  describe('Drink tests', () => {
    let dietcoke
    beforeEach(() => {
      return Drink.create({
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
      }).then(drink => {
        dietcoke = drink
      })
    })
  
    describe('definition', () => {
  
      it('has proper definition attributes', () => {
          expect(Drink.attributes.name).to.be.an('object');
          expect(Drink.attributes.flavor).to.be.an('object');
          expect(Drink.attributes.price).to.be.an('object');
          expect(Drink.attributes.description).to.be.an('object');
          expect(Drink.attributes.size).to.be.an('object');
          expect(Drink.attributes.tag).to.be.an('object');
          expect(Drink.attributes.imageUrl).to.be.an('object');
          expect(Drink.attributes.inventory).to.be.an('object');
          expect(Drink.attributes.packageSize).to.be.an('object');
      });
  })
  })

describe('Order tests', () => {
  let orderTest
  beforeEach(() => {
    return Order.create({
      total: 100,
      shippingMethod: 'Royal Mail',
      status: 'complete'
    }).then(order => {
      orderTest = order
    })
  })

  describe('definition', () => {

    it('has proper definition attributes', () => {
        expect(Order.attributes.total).to.be.an('object');
        expect(Order.attributes.shippingMethod).to.be.an('object');
        expect(Order.attributes.status).to.be.an('object');
      });
    })
  })

  describe('Address tests', () => {
    let addressTest
    beforeEach(() => {
      return Address.create({
        street: 'Pennsylvania Ave NW',
        number: 1600,
        city: 'Washington DC',
        zipCode: '20500',
        country: 'USA'
      }).then(address => {
        addressTest = address
      })
    })
  
    describe('definition', () => {
  
      it('has proper definition attributes', () => {
          expect(Address.attributes.street).to.be.an('object');
          expect(Address.attributes.number).to.be.an('object');
          expect(Address.attributes.city).to.be.an('object');
          expect(Address.attributes.zipCode).to.be.an('object');
          expect(Address.attributes.country).to.be.an('object');
        });
      })
    })

    describe('Item tests', () => {
      let itemTest
      beforeEach(() => {
        return Item.create({
          quantity: 1,
          drinkId: 1,
          orderId: 1
        }).then(item => {
          itemTest = item
        })
      })
    
      describe('definition', () => {
    
        it('has proper definition attributes', () => {
            expect(Address.attributes.quantity).to.be.an('object');
            expect(Address.attributes.drinkId).to.be.an('object');
            expect(Address.attributes.orderId).to.be.an('object');
          });
        })
      })
    }
// const orders =
//   {
//     total: 100,
//     shippingMethod: 'Royal Mail',
//     status: 'complete'
//   }

// const address =
//   {
//     street: 'Pennsylvania Ave NW',
//     number: 1600,
//     city: 'Washington DC',
//     zipCode: '20500',
//     country: 'USA'
//   }

// const item =
//   {
//     quantity: 1,
//     drinkId: 1,
//     orderId: 1
//   }