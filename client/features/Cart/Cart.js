import React, { useEffect } from 'react';
import Checkout from '../Checkout/Checkout';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CartProduct from './CartProduct';
import { selectCart } from '../../slices/cart/cartslice';
// import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();

  const cart = useSelector(selectCart);

  const guestCart = useSelector((state) => state.cart);
  console.log('this is guest cart--->', guestCart);

  const cartTotal = () => {
    let total = 0;
    cart.forEach(product => {
        total += product.price * product.quantity
    })
    return total
}

  return (
    <div id="cartDiv">
      <p id="cartText">Guest Cart</p>
      {guestCart?.map((product) => (
        <CartProduct
          // <div key={product.id}>
          //   <img src={product.imageUrl} alt="BLANK" />
          //   <p>{product.name}</p>
          //   <p>${product.price}</p>
          //   <p>{product.description}</p>
          //   {/* <p>Quantity: {product.quantity}</p> */}
          // </div>
          key={product.id}
          id={product.id}
          imageUrl={product.imageUrl}
          name={product.name}
          price={product.price}
          quantity={product.quantity}
        />
      ))}
      <Link id="checkout" to="/checkout">
        Proceed to checkout
      </Link>
      <p>Total: ${cartTotal()}</p>
    </div>
  );
};

export default Cart;
