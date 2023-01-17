import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './singleProduct.css'
import { addToCart } from '../../slices/cart/cartslice';
import {
  fetchSingleProductAsync,
  selectSingleProduct,
  chooseSize
} from '../../slices/products/singleProductSlice';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const product = useSelector(selectSingleProduct);
//   const { name, description, price, quantity, imageUrl } = product;

    // console.log("single",singleProduct);

    useEffect(() => {
        dispatch(fetchSingleProductAsync(id));
    }, []);

    // For Size Buttons
     const sizeArr = []
     let n = 5 
     while(n <= 12.5){
        sizeArr.push(n)
        n = n + 0.5
     }

return(
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
                    {sizeArr.map(currSize => {
// Mapping over sizeArr(written above) to create button for each size 
                        return <button key={currSize} onClick={ () => dispatch(chooseSize(currSize))}  className={(currSize == product.size) ? 'sizeBtns selected' : 'sizeBtns'} type="button">{currSize}</button>
                    })}
                </li>
                <li>
                    <button  id="cartBtn" onClick={() => dispatch(addToCart(product))}>Add to cart</button>
                </li>
            <li>
                <p className="prodDetail">Details</p>
                    <p className="prodDetail">{product.description}</p>
            </li>
        </ul>
    </div>
)
} 

export default SingleProduct  
