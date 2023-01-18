import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartProduct from './CartProduct';
import './cart.css';

const Cart = () => {
  const cart = useSelector((state) => state.cart); 

  console.log('this is cart--->', cart);
  return (
    <div id="cartDiv">
      <p id="cartText">My Cart</p>
      {cart?.map((product) => (
        <CartProduct
        key={product.id}
        id={product.id}
        imageUrl={product.imageUrl}
        name={product.name}
        price={product.price}
        size={product.size}
        quantity={product.quantity}
          />
      ))}
      <Link id="checkout" to="/checkout">
        Proceed to checkout
      </Link>
    </div>
  );
};

export default Cart;
