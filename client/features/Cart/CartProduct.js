// import { EventBusy } from '@mui/icons-material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  adjustQtyAsync,
  decrementQuantity,
  incrementQuantity,
  removeCart,
  removeItemAsync,
} from '../../slices/cart/cartslice';

const CartProduct = ({ id, imageUrl, name, price, size, quantity = 0 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const user = useSelector((state) => state.auth.me);

  const increaseQty = (item) => {
    let productId = item.id; //* this is the product id
    console.log("increase productid ------>", productId)
    let quantity = item.quantity;
    console.log("increase quant ------>", quantity);
    quantity++;
    let cartId = user.cartId;
    console.log("increase cartid ------>", user.cartId);
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

  const handleDelete = (item) => {
    // evt.preventDefault();
    let productId = item.id;
    let cartId = user.cartId;
    const updatedItem = { productId, cartId };
    dispatch(removeItemAsync(updatedItem))
  };

  // const handleDelete = (evt) => {
  //   // evt.preventDefault();
  //   // let productId = item.id;
  //   // let cartId = user.cartId;
  //   const updatedItem =  evt ;
  //   dispatch(removeItemAsync(updatedItem)).then(() => {
  //     navigate("/cart");
  //   });
  // };

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
        <p>Size:{size}</p>
        </div>
        <div id='quantSect'>
          {isLoggedIn ? (
            <>
              <button onClick={() => decreaseQty({ id, quantity })}>-</button>
              <p>{quantity}</p>
              <button onClick={() => increaseQty({ id, quantity })}>+</button>
              <button onClick={() => handleDelete({ id })}>
                Remove from Basket
              </button>
            </>
          ) : (
            <>
              <button className='quantBtns' onClick={() => dispatch(decrementQuantity(id))}>-</button>
              <p id='quantityNum'>{quantity}</p>
              <button className='quantBtns' onClick={() => dispatch(incrementQuantity(id))}>+</button>
              <button id='remove' onClick={() => dispatch(removeCart(id))}>
                Remove from Basket
              </button>
            </>
          )}
        </div>
      </div>
      </ul>
    </div>
  );
};

export default CartProduct;
