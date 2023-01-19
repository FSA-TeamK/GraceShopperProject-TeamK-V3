//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');

const Product = require('./models/product');

const Cart = require('./models/cart');

const CartItems = require('./models/cartItems');

//associations could go here!
// User.hasMany(Cart);
// Cart.belongsTo(User);

// Cart.belongsToMany(Product, { through: CartItems });
// Product.belongsToMany(Cart, { through: CartItems });

// Product.hasMany(CartItems);
// CartItems.belongsTo(Product);

Cart.hasOne(User);
// User.hasOne(Cart);
// Cart.belongsTo(User);
Cart.hasMany(Product);
Cart.belongsToMany(Product, { through: CartItems });
Product.belongsToMany(Cart, { through: CartItems });
Product.hasMany(CartItems);
CartItems.belongsTo(Product);

module.exports = {
  db,
  models: {
    User,
    Product,
    Cart,
    CartItems,
  },
};
