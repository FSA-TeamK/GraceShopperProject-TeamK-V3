// made cart model for the cart table in the database currently blank but will be filled in later. -sal 1/10

const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
    status: {
        type: Sequelize.ENUM("CART", "PURCHASED"),
        allowNull: false,
        defaultValue: "CART"
    }
    
});

module.exports = Cart;
