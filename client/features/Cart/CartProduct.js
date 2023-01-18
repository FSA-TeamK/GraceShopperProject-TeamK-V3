import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  adjustQtyAsync,
  decrementQuantity,
  incrementQuantity,
  removeCart,
} from '../../slices/cart/cartslice';

const CartProduct = ({ id, imageUrl, name, price, quantity = 0 }) => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const user = useSelector((state) => state.auth.me);

  const increaseQty = (item) => {
    let productId = item.id; //* this is the product id
    let quantity = item.quantity;
    quantity++;
    let cartId = user.cartId;
    const updatedItem = { productId, quantity, cartId };
    dispatch(adjustQtyAsync(updatedItem));
  };

  const decreaseQty = (item) => {
    let productId = item.id;
    let quantity = item.quantity;
    quantity--;
    let cartId = user.cartId;
    const updatedItem = { productId, quantity, cartId };
    dispatch(adjustQtyAsync(updatedItem));
  };

  return (
    <div className="cartProduct">
      <div className="cartProduct_image">
        <img src={imageUrl} alt="BLANK" />
      </div>
      <div className="cartProduct_info">
        <p className="cartProduct_title">{name}</p>
        <p className="cartProduct_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="cartProduct_rating">
          <p>⭐</p>
        </div>
        <div className="cartProduct_incrDec">
          {isLoggedIn ? (
            <>
              <button onClick={() => decreaseQty({ id, quantity })}>-</button>
              <p>{quantity}</p>
              <button onClick={() => increaseQty({ id, quantity })}>+</button>
            </>
          ) : (
            <>
              <button onClick={() => dispatch(decrementQuantity(id))}>-</button>
              <p>{quantity}</p>
              <button onClick={() => dispatch(incrementQuantity(id))}>+</button>
              <button onClick={() => dispatch(removeCart(id))}>
                Remove from Basket
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
