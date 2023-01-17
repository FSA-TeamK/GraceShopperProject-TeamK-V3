import React, { useEffect } from 'react';
import Checkout from '../Checkout/Checkout';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CartProduct from './CartProduct';
import { selectCart } from '../../slices/cart/cartslice';
import { fetchCartAsync } from '../../slices/cart/cartslice';

const UserCart = () => {
  const dispatch = useDispatch();

//   const cart = useSelector(selectCart);

  const isLoggedIn = useSelector((state) => state.auth.me.id);

  const userCartId = useSelector((state) => state.auth.me.cartId);
  console.log('userCartId', userCartId);

  const cart = useSelector((state) => state.cart);
  console.log('this is usercart--->', cart)

  useEffect(() => {
    if (isLoggedIn) {
      console.log('about to fetch cart');
      dispatch(fetchCartAsync(userCartId));
    }
  }, [isLoggedIn]);

  return (
    <div id="cartDiv">
      <p id="cartText">My Cart</p>
      {cart?.map((product) => (
        <CartProduct
          key={product.id}
          id={product.id}
          imageUrl={product.product.imageUrl} 
          name={product.name}
          price={product.price}
          quantity={product.quantity}
        />
      ))}
      <Link id="checkout" to="/checkout">
        Proceed to checkout...
      </Link>
    </div>
  );
};

export default UserCart;
