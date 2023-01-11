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

router.post('/', async (req, res, next) => {
    try{
        const newProduct = await Product.create(req.body);
        res.status(201).send(newProduct);
    } catch(err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try{ 
        const deleteProduct = await Product.findByPk(req.params.id);
        await deleteProduct.destroy();
        res.json(deleteProduct);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try{
        const updateProduct = await Product.findByPk(req.params.id);
        res.json(await updateProduct.update(req.body));
    } catch(err){
        next(err);
    }
});

module.exports = router