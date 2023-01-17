import React, { useEffect } from 'react';
import Checkout from '../Checkout/Checkout';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CartProduct from './CartProduct';
import { selectCart } from '../../slices/cart/cartslice';
// import './Cart.css';
import { fetchCartAsync } from '../../slices/cart/cartslice';

const Cart = () => {
  const dispatch = useDispatch();
  
  const cart = useSelector(selectCart);
  

  const isLoggedIn = useSelector((state) => state.auth.me.id);

  const userCartId = useSelector((state) => state.auth.me.cartId);
  console.log('userCartId', userCartId);

  const guestCart = useSelector((state) => state.cart);
  console.log('this is guest cart--->', guestCart);

    useEffect(() => {
      if (isLoggedIn) {
        console.log("about to fetch cart")
        dispatch(fetchCartAsync(userCartId));
      }
  }, [isLoggedIn]);
  

  return (
    <div id="cartDiv">
      <p id="cartText">My Cart</p>
      {/* {isLoggedIn ? (
        {cart?.map((product) => (
          <CartProduct
            key={product.id}
            id={product.id}
            imageUrl={product.imageUrl}
            name={product.name}
            price={product.price}
            quantity={product.quantity}
          />

        ) )}
      ) : ( */}
        
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
    </div>
  );
};

export default Cart;
