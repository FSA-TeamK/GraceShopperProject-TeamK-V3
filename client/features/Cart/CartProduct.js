import React from 'react'
import { useDispatch } from 'react-redux';
import { removeCart } from '../../slices/cart/cartSlice';

const CartProduct = ({id, imageUrl, name, price}) => {
    const dispatch = useDispatch();

  return (
    <div className='cartProduct'>
        <div className='cartProduct_image'>
            <img src={imageUrl} alt="BLANK" />
        </div>
        <div className='cartProduct_info'>
            <p className='cartProduct_title'>{name}</p>
            <p className='cartProduct_price'>
                <small>$</small>
                <strong>{price}</strong>
            </p>
            <div className='cartProduct_rating'>
                <p>⭐</p>
            </div>
            <button onClick={() => dispatch(removeCart(id))}>Remove from Basket</button>
        </div>
    </div>
    
  )
}

export default CartProduct