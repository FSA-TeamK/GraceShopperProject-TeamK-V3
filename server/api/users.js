const router = require('express').Router();
const {
  models: { User, Product, Cart, CartItems },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // only admins should be able to see any users information.

      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username', 'email', 'password', 'isAdmin'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const userId = await User.findbyPk(req.params.id);
    res.json(userId);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    await Cart.create({
      userId: newUser.id,
    });
    res.status(201).send(newUser);
  } catch (err) {
    next(err);
  }
});

// adding product to cart
router.post('/carts', async (req, res, next) => {
  try {
    // find the product in the db
    const product = await Product.findByPk(req.param.id);

    // find the user cart order
    // const currentOrder = await Cart.findOne({
    //   where: {
    //     // userId: req.params.userId,
    //     status: 'CART'
    //   }
    // })

    // if the cart does not exist yet, create the cart
    // if (!currentOrder) {
    const currentOrder = await Cart.create({
      // userId: req.params.userId,
      status: 'CART',
    });

    await CartItems.create({
      orderId: currentOrder.id,
      productId: req.body.id,
      quantity: 1,
      purchasePrice: product.price,
    });
    // }

    // if the cart does exist, add the product to the cart
    if (currentOrder) {
      await CartItems.create({
        orderId: currentOrder.id,
        productId: req.body.id,
        quantity: 1,
        purchasePrice: product.price,
      });
    }

    // retrieve the newly added item
    const newItem = await CartItems.findOne({
      where: {
        productId: product.id,
        orderId: currentOrder.id,
      },
    });

    res.json(newItem);
  } catch (error) {
    next(error);
  }
});

// route to checkout cart
router.put('/checkout/:userId/', async (req, res, next) => {
  try {
    const order = await Cart.findOne({
      where: {
        userId: req.params.userId,
        status: 'CART',
      },
    });
    order.status = 'PURCHASED';
    await order.save();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
