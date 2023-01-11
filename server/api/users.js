const router = require('express').Router()
const { models: { User, Product,Cart }} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username', 'email', 'password']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try{
    const userId = await User.findbyPk(req.params.id);
    res.json(userId);
  } catch (err){
    next(err);
  }
});

// user cart
router.get('/cart/:userId', async (req, res, next) => {
  try {
    const cartItems = await Product.findAll({
      include: {
        model: Cart,
        where: {
          userId: req.params.userId,
          status: 'CART'
        }
      }
    })
    res.json(cartItems)
  } catch (error) {
    next(error)
  }
});

// adding product to cart
router.put('/cart/:userId', async (req, res, next) => {
  try {
    // find the product in the db
    const product = await Product.findByPk(req.body.id)

    // find the user cart order
    const currentOrder = await Cart.findOne({
      where: {
        userId: req.params.userId,
        status: 'CART'
      }
    })

    // if the cart does not exist yet, create the cart
    if (!currentOrder) {
      const currentOrder = await Cart.create({
        userId: req.params.userId,
        status: 'cart'
      })

      await ProductOrder.create({
        orderId: currentOrder.id,
        productId: req.body.id,
        quantity: 1,
        purchasePrice: product.price
      })
    }

    // if the cart does exist, add the product to the cart

    if (currentOrder) {
      await ProductOrder.create({
        orderId: currentOrder.id,
        productId: req.body.id,
        quantity: 1,
        purchasePrice: product.price
      })
    }

    // retrieve the newly added item
    const newItem = await ProductOrder.findOne({
      where: {
        productId: product.id,
        orderId: currentOrder.id
      }
    })

    res.json(newItem)
  } catch (error) {
    next(error)
  }
})

module.exports = router