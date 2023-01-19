import React, { useEffect } from 'react';
import Checkout from '../Checkout/Checkout';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CartProduct from './CartProduct';
import { adjustQtyAsync, selectCart } from '../../slices/cart/cartslice';
import { fetchCartAsync } from '../../slices/cart/cartslice';

const UserCart = () => {
  const dispatch = useDispatch();

  //   const cart = useSelector(selectCart);

  const isLoggedIn = useSelector((state) => state.auth.me.id);

  const userCartId = useSelector((state) => state.auth.me.cartId);

  const cart = useSelector((state) => state.cart);
  console.log('this is usercart--->', cart);
  // console.log(
  //   'productId',
  //   cart.map((product) => product.product.id)
  // );

  useEffect(() => {
    if (isLoggedIn) {
      //* if user is logged in, fetch their cart
      console.log('about to fetch cart');
      dispatch(fetchCartAsync(userCartId));
    }
  }, [isLoggedIn]);

  // const cartTotal = cart.reduce((acc, product) => {
  //     return acc + product.price * product.quantity
  // }
  // , 0)

  const cartTotal = () => {
    let total = 0;
    cart.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total;
  };

  return (
    <div id="cartDiv">
      <p id="cartText">My Cart</p>
      {cart?.map((product) => (
        <CartProduct
          key={product.id}
          // id={product.id}
          // imageUrl={product.imageUrl}
          id={product.product.id}
          imageUrl={product.product.imageUrl}
          name={product.name}
          price={product.price}
          quantity={product.quantity}
        />
      ))}
      <Link id="checkout" to="/payment">
        Proceed to checkout...
      </Link>
      <p>Total: ${cartTotal()}</p>
    </div>
  );
};

export default UserCart;
