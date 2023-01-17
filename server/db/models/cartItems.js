
const Sequelize = require('sequelize');
const db = require('../db');

const CartItems = db.define('cartItems', {
    // id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    // },    
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        // validate: {
        //     notEmpty:true
        }
    

});

module.exports = CartItems;