import React from 'react';
import { useDispatch } from 'react-redux';
import {
  decrementQuantity,
  incrementQuantity,
  removeCart,
} from '../../slices/cart/cartslice';

const CartProduct = ({ id, imageUrl, name, price, quantity = 0 }) => {
  const dispatch = useDispatch();

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
          <button onClick={() => dispatch(decrementQuantity(id))}>-</button>
          <p>{quantity}</p>
          <button onClick={() => dispatch(incrementQuantity(id))}>+</button>
        </div>
        <button onClick={() => dispatch(removeCart(id))}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
