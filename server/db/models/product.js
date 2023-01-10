const require sequelize = require('sequelize')
const db = require('../db')

// made product model for the product table in the database, added rating but not sure if will currently use. 
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
    rating : {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
            min: 0,
            max: 5
        }

    },
     imageUrl: {
        type: Sequelize.STRING,
        defaultValue: ''
    }
})






module.exports = Product
