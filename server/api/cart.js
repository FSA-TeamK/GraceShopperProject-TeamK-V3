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
        cartId: req.params.id,
      },
      include: {
        model: Product,
      },
    });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

router.post('/:id', async (req, res, next) => {
  try {
    const cart = await CartItems.create(req.body);
    res.status(201).send(cart);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

router.put('/:cartId/:productId', async (req, res, next) => {
  try {
    console.log('put item------>', req.body);
    console.log('test productId ------>', req.params.productId);
  
    const updateCartItem = await CartItems.findOne({ //* Uses findOne instead of findByPk to find the cartItem
      where: {
        cartId: req.params.cartId, //* this is the cart id
        productId: req.params.productId, // this is the cartItem id not the product id
        // id: req.body.id, // product id is in the req.body

      }
    });
    // const updateCartItem = await CartItems.findByPk(req.params.id); //! Uses the wrong primary key this is the CART PK not the cartItem PK
    res.json(await updateCartItem.update(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete('/:cartId/:productId', async (req, res, next) => {
  try {

  } catch(err) {
    next(err)
  }
})

module.exports = router;
