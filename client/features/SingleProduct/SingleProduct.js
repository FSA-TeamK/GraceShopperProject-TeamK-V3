import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './SingleProduct.css';
import { addToCart } from '../../slices/cart/cartslice';
// import { addCartItem } from '../../slices/cart/cartslice';
import {
  fetchSingleProductAsync,
  selectSingleProduct,
} from '../../slices/products/singleProductSlice';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const product = useSelector(selectSingleProduct);
  const { name, description, price, quantity, imageUrl } = product;

    console.log("single",singleProduct);

    useEffect(() => {
        dispatch(fetchSingleProductAsync(id));
    }, []);

  return (
    <div className="single_product">
      <div className="single_product_name">
        <p>{name}</p>
      </div>
      <p>{description}</p>
      <p className="single_product_price">
        <small>$</small>
        <strong>{price}</strong>
      </p>
      <p>{quantity}</p>
      <img id='single_image' src={imageUrl} alt="BLANK" />
      <button onClick={() => dispatch(addToCart(product))}>Add to Basket</button>
      {/* <button onClick={handleAddToCart}>Add to Basket</button> */}

    </div>
  );
};

export default SingleProduct;
