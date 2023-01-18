import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './SingleProduct.css';
import { addToCart} from "../../slices/cart/cartslice"
// import { addCartItem } from '../../slices/cart/cartslice';
import {
  fetchSingleProductAsync,
  selectSingleProduct,
} from '../../slices/products/singleProductSlice';
import axios from 'axios';
import { useState } from 'react';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.auth.me); // user is checked for admin or not
  const product = useSelector(selectSingleProduct);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imageUrl, setImageUrl] = useState('');

 

  useEffect(() => {
    dispatch(fetchSingleProductAsync(id));
    if(product){
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setQuantity(product.quantity);
        setImageUrl(product.imageUrl);
    }
  }, [product,dispatch, id]);
  
  if (!product) return null;

  return (
    <div className="single_product">
      <div className="single_product_name">
        <p>{product.name}</p>
      </div>
      <p>{description}</p>
      <p className="single_product_price">
        <small>$</small>
        <strong>{product.price}</strong>
      </p>
      <p>{product.quantity}</p>
      <img id='single_image' src={product.imageUrl} alt="BLANK" />
      <button onClick={() => dispatch(addToCart(product))}>Add to Basket</button> 
      {/* <button onClick={handleAddToCart}>Add to Basket</button> */} 
      {user.isAdmin ? (<button onClick={()=> setShowForm(true)}>Edit</button>): null} 
      {showForm ? ( <form onSubmit={async(e)=>{ //show form when clicked
          e.preventDefault();
          const res=await axios.put(`/api/products/${id}`, {name, description, price, quantity, imageUrl}) //put request to update product
          setShowForm(false); //hide form after submit
      }}> 
        <input value={name}onChange={(e)=>setName(e.target.value)} type="text" placeholder="name" /> 
        <input value={description}onChange={(e)=>setDescription(e.target.value)} type="text" placeholder="description" />
        <input value={price}onChange={(e)=>setPrice(e.target.value)} type="text" placeholder="price" />
        <input value={quantity}onChange={(e)=>setQuantity(e.target.value)} type="text" placeholder="quantity" />
        <input value={imageUrl}onChange={(e)=>setImageUrl(e.target.value)} type="text" placeholder="imageUrl" />        
        <button type="submit">Submit</button>
      </form>) : null}
      

    </div>
  );
};

export default SingleProduct;
