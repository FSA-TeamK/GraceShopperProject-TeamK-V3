
const Sequelize = require('sequelize');
const db = require('../db');

const CartItems = db.define('cartItems', {
    productPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty:true
        }
    }
});

module.exports = CartItems;