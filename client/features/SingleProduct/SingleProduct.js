import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './singleProduct.css';
import { addToCart } from '../../slices/cart/cartslice';
import { addCartAsync } from '../../slices/cart/cartslice';
import {
  fetchSingleProductAsync,
  selectSingleProduct,
  chooseSize,
} from '../../slices/products/singleProductSlice';
import { me } from '../Auth/authSlice';
import axios from 'axios';


const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  const user = useSelector((state) => state.auth.me);

  const product = useSelector(selectSingleProduct);
  // const { name, description, price, quantity, imageUrl } = product;

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const addToUserCart = async (product) => {
    let quantity = 1;
    let cartId = user.cartId;
    let productId = product.id;
    console.log('product', productId);
    let name = product.name;
    let price = product.price;
    dispatch(addCartAsync({ quantity, cartId, productId, name, price }));
  };

  // useEffect(() => {
  //   dispatch(fetchSingleProductAsync(id));
  // }, []);

  useEffect(() => {
    dispatch(fetchSingleProductAsync(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setQuantity(product.quantity);
      setImageUrl(product.imageUrl);
    }
  }, [product]);

  if (!product) return null;

  // return (
  //   <div className="single_product">
  //     <div className="single_product_name">
  //       <p>{name}</p>
  //     </div>
  //     <p>{description}</p>
  //     <p className="single_product_price">
  //       <small>$</small>
  //       <strong>{price}</strong>
  //     </p>
  //     <p>{quantity}</p>
  //     <img id="single_image" src={imageUrl} alt="BLANK" />
  //     {/* <button onClick={() => dispatch(addToCart(product))}>Add to Basket</button> */}
  //     {isLoggedIn ? (
  //       <button onClick={() => addToUserCart(product)}>
  //         Add to Basket
  //       </button>
  //     ) : (
  //       <button onClick={() => dispatch(addToCart(product))}>
  //         Add to Basket
  //       </button>
  //     )}

  //   </div>

  // For Size Buttons
  const sizeArr = [];
  let n = 5;
  while (n <= 12.5) {
    sizeArr.push(n);
    n = n + 0.5;
  }

  return (
    <div id="singProdDiv">
      <img id="singProdImg" src={product.imageUrl} />
      <ul id="singProdUl">
        <li>
          <p id="sneakTitle">{product.name}</p>
        </li>
        <li>
          <p id="price">${product.price}</p>
        </li>
        <li>
          <p id="sizeText">Sizes</p>
        </li>
        <li id="sizBtnLi">
          {sizeArr.map((currSize) => {
            //! Mapping over sizeArr(written above) to create button for each size
            return (
              <button
                key={currSize}
                onClick={() => dispatch(chooseSize(currSize))}
                className={
                  currSize == product.size ? 'sizeBtns selected' : 'sizeBtns'
                }
                type="button"
              >
                {currSize}
              </button>
            );
          })}
        </li>


        {user.isAdmin ? (<button onClick={()=> setShowForm(true)}>Edit</button>): null} 
      {showForm ? ( <form onSubmit={async(e)=>{ //show form when clicked
          e.preventDefault();
          const res=await axios.put(`/api/products/${id}`, {name, description, price, quantity, imageUrl}) //put request to update product
          setShowForm(false); 
          dispatch(fetchSingleProductAsync(id));
          //hide form after submit
      }}> 
        <input value={name}onChange={(e)=>setName(e.target.value)} type="text" placeholder="name" /> 
        <input value={description}onChange={(e)=>setDescription(e.target.value)} type="text" placeholder="description" />
        <input value={price}onChange={(e)=>setPrice(e.target.value)} type="text" placeholder="price" />
        <input value={quantity}onChange={(e)=>setQuantity(e.target.value)} type="text" placeholder="quantity" />
        <input value={imageUrl}onChange={(e)=>setImageUrl(e.target.value)} type="text" placeholder="imageUrl" />        
        <button type="submit">Submit</button>
      </form>) : null}




        {isLoggedIn ? (
          <li>
            <button id="cartBtn" onClick={() => addToUserCart(product)}>
              Add to cart
            </button>
          </li>
        ) : (
          <li>
            <button id="cartBtn" onClick={() => dispatch(addToCart(product))}>
              Add to cart
            </button>
          </li>
        )}
        <li>
          <p className="prodDetail">Details</p>
          <p className="prodDetail">{product.description}</p>
        </li>
      </ul>
    </div>
  );
};

export default SingleProduct;
