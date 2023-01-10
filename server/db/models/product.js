const require sequelize = require('sequelize')
const db = require('../db')


const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.TEXT,
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
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: ''
    }
})


module.exports = Product
