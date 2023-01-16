import React from 'react';
import Checkout from '../Checkout/Checkout';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartProduct from './CartProduct';
import { selectCart } from '../../slices/cart/cartslice';
import './Cart.css';

const Cart = () => {
    // const cart = useSelector(selectCart)
  const cart = useSelector((state) => state.cart); 

  console.log('this is cart--->', cart);

  return (
    <div id="cartDiv">
      <p id="cartText">My Cart</p>
      {cart?.map((product) => (
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
    </div>
  );
};

export default Cart;
