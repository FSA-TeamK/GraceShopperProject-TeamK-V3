const router = require('express').Router();
const {
  models: { Cart, CartItems, Product },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const carts = await Cart.findAll();
    res.json(carts);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const cart = await CartItems.findAll({
      where: {
        cartId: req.params.id
      },
      include: {
        model: Product
      } 
  });
    res.json(cart);
  } catch (err) {
    next(err);
  }
})

router.post('/:id', async (req, res, next) => {
  try {
    const cart = await CartItems.create(req.body);
    res.status(201).send(cart);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

module.exports = router;
