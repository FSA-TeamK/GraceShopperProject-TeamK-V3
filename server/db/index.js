//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');

const Product = require('./models/product');

//associations could go here!
User.hasMany(Product);
Product.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Product
  },
}
