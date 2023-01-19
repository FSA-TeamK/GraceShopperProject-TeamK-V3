const router = require('express').Router()
const { appBarClasses } = require('@mui/material')
const app = require('../app')
const { models: { User, Product, Cart, CartItems }} = require('../db')

router.get('/', async (req, res, next) => {
  try {
      const users = await User.findAll({
        // explicitly select only the id and username fields - even though
        // only admins should be able to see any users information.   
                                                                                
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'username', 'email', 'password', 'isAdmin']
      })
      res.json(users)
  } catch (err) {
    next(err)
  }
})


  
router.get('/:id', async (req, res, next) => {
  try{
    const userId = await User.findByPk(req.params.id);
    res.json(userId);
  } catch (err){
    next(err);
  }
});
///////////////////////////////////////////////////
router.patch('/:id', async (req, res, next) => {
  try{
    const user = await User.findByPk(req.params.id);
    const updatedUser = await user.update(req.body);   //edit form values when user clicks submit-sal 
    res.json(updatedUser);
  } catch (err){
    next(err);
  }
});
///////////////////////////////////////////////////


router.post("/", async (req, res, next) => {
  try{
    const newUser = await User.create(req.body);
    res.status(201).send(newUser);
  } catch(err){
    next(err);
  }
});

//* users/carts routes
router.get('/carts', async (req, res, next) => {
  try {
    const cartItems = await Product.findAll({
      include: {
        model: Cart,
        where: {
          // userId: req.params.userId,
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
router.post('/carts', async (req, res, next) => {
  try {
    // find the product in the db
    const product = await Product.findByPk(req.param.id)

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
        status: 'CART'
      })

      await CartItems.create({
        orderId: currentOrder.id,
        productId: req.body.id,
        quantity: 1,
        purchasePrice: product.price
      })
    // }

    // if the cart does exist, add the product to the cart
    if (currentOrder) {
      await CartItems.create({
        orderId: currentOrder.id,
        productId: req.body.id,
        quantity: 1,
        purchasePrice: product.price
      })
    }

    // retrieve the newly added item
    const newItem = await CartItems.findOne({
      where: {
        productId: product.id,
        orderId: currentOrder.id
      }
    })

    res.json(newItem)
  } catch (error) {
    next(error)
  }
});

//delete item from cart
router.delete('/cart/:userId/:productId', async (req, res, next) => {
    try {
      const removeProduct = await Product.findByPk(req.params.productId)
      const currentOrder = await Cart.findOne({
        where: 
        {
          userId: req.params.userId,
          status: 'CART'
        }
      })
      await currentOrder.destroy(removeProduct)
      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
});

// route to checkout cart
router.put('/checkout/:userId/', async (req, res, next) => {
  try {
    const order = await Cart.findOne({
      where: {
        userId: req.params.userId,
        status: 'CART'
      }
    })
    order.status = 'PURCHASED'
    await order.save()
  } catch (error) {
    next(error)
  }
});

module.exports = router