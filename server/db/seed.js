const { db, Order, Address, Brand, Category, Drink, User } = require('./index');

const categories = [
  {
    name: 'Dairy',
  },
  {
    name: 'Soft Drink',
  },
  {
    name: 'Juice',
  },
  {
    name: 'Beer',
  },
  {
    name: 'Alcohol',
  },
  {
    name: 'Water',
  },
  {
    name: 'Diet',
  },
];

const brands = [
  {
    name: 'Coca-cola',
    description: 'The king of all drinks',
    imageUrl:
      'https://yt3.ggpht.com/a-/ACSszfGWvFjr4gb1ocKes4p-QHqowwLMz2loBWddxg=s900-mo-c-c0xffffffff-rj-k-no',
  },
  {
    name: 'Fiji',
    description: 'the king of all waters',
    imageUrl: 'https://i.ytimg.com/vi/juHtVC60Kuo/maxresdefault.jpg',
  },
  {
    name: 'Pepsi',
    description: 'The pleib drink',
    imageUrl: 'https://abasto.com/wp-content/uploads/2016/10/pepsico.jpg',
  },
];

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
    packageSize: 1,
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
    packageSize: 1,
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
    packageSize: 1,
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
    packageSize: 1,
  },
];
