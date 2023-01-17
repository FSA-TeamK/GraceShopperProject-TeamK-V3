import React from 'react';
import Checkout from '../Checkout/Checkout';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartProduct from './CartProduct';
import { selectCart } from '../../slices/cart/cartSlice';
import './cart.css'

const Cart = () => {
    const cart = useSelector(selectCart)
//   const cart = useSelector((state) => state.cart);


  console.log('this is cart--->', cart);

  return (
    <div id="cartDiv">
      <p id="cartText">My Cart</p>
      {cart?.map((product) => (
        <div key={product.id}>
          <ul id='cartUl'>
            <li className='cartLi'>
          <img id='prodImg' src={product.imageUrl} alt="BLANK" />
          </li>
          <li className='cartLi'>
          <p id='prodName' >{product.name}</p>
          <p>${product.price}</p>
          <p>Size: {product.size}</p>
          <p>Quantity: {product.quantity}</p>
          <section id='quantSect'>
          <button className='quantBtns' type='button'>+</button>
          <p>1</p>
          <button className='quantBtns' type='button'>-</button>
          </section>
          </li>
          </ul>
        </div>
      ))}
      <Link id="checkout" to="/checkout">
        Proceed to checkout
      </Link>
    </div>
  );
};

export default Cart;
