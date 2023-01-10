const router = require('express').Router()
const { models: { Product }} = require('../db')

router.get('/', async (req, res, next) => { 
    try {
        const products = await Product.findAll()
        res.json(products)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const productId = await Product.findByPk(req.params.id)
        res.json(productId)
    } catch (err) {
        next(err)
    }
})

module.exports = router