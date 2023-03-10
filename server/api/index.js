const router = require('express').Router()

//* /api/users
router.use('/users', require('./users'));

//* /api/products
router.use('/products', require('./products'));

//* /api/cart
router.use('/cart', require('./cart'));


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})


module.exports = router