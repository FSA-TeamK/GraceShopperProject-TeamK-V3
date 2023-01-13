import React from 'react';
import Checkout from '../Checkout/Checkout';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartProduct from './CartProduct';
import { selectCart } from '../../slices/cart/cartslice';

const Cart = () => {
    const cart = useSelector(selectCart)
//   const cart = useSelector((state) => state.cart);


  console.log('this is cart--->', cart);

  return (
    <div id="cartDiv">
      <p id="cartText">My Cart</p>
      {cart?.map((product) => (
        <div key={product.id}>
          <img src={product.imageUrl} alt="BLANK" />
          <p>{product.name}</p>
          <p>${product.price}</p>
          <p>{product.description}</p>
          {/* <p>Quantity: {product.quantity}</p> */}
        </div>
      ))}
      <Link id="checkout" to="/checkout">
        Proceed to checkout
      </Link>
    </div>
  );
};

export default Cart;
