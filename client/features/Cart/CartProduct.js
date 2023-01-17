import React from 'react';
import { useDispatch } from 'react-redux';
import {
  decrementQuantity,
  incrementQuantity,
  removeCart,
} from '../../slices/cart/cartslice';

const CartProduct = ({ id, imageUrl, name, price, size, quantity = 0 }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <ul id='cartUl'>
      <div>
        <img id='prodImg' src={imageUrl} alt="BLANK" />
      </div>
      <div className='cartLi'>
        <p id='prodName'>{name}</p>
        <p>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div>
        <p>Size: {size}</p>
        </div>
        <div id='quantSect'>
          <button className='quantBtns' onClick={() => dispatch(decrementQuantity(id))}>-</button>
          <p id='quantityNum'>{quantity}</p>
          <button className='quantBtns' onClick={() => dispatch(incrementQuantity(id))}>+</button>
        </div>
        <button id='remove' onClick={() => dispatch(removeCart(id))}>
          Remove from Basket
        </button>
      </div>
      </ul>
    </div>
  );
};

export default CartProduct;
