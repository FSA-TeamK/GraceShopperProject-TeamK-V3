import React from "react";
import {useSelector} from 'react-redux'
import AllProducts from '../AllProducts/AllProducts.js'
import athletic1 from "../pictures/ath1.jpeg"
import './singleProduct.css'
import { useState } from "react";


const SingleProduct = () => {

     const [size, setSize] = useState(null)
     const sizeArr = []
     let n = 5 
     while(n < 12){
        sizeArr.push(n)
        n = n + 0.5
     }

// product info sample
   const Product = {
        name: 'Athletic Runner',
        description:
          'The Nike Air Force 1 is a classic basketball shoe that has been around since 1982. It was the first basketball shoe to feature Nike Air technology, which provides lightweight cushioning. The shoe is also known for its iconic Swoosh logo, which was designed by Carolyn Davidson.',
        price: 100,
        quantity: 10,
        imageUrl:
          athletic1,
      }

    const AddToCart = () => {
        console.log('added to cart')
    }
    return(
        <div id="singProdDiv">
            <img id="singProdImg" src={athletic1}></img>
            <ul id="singProdUl">
                <li>
                    <p id="sneakTitle">Athletic Runner</p>
                    </li>
                    <li>
                    <p id="price">${Product.price}</p>
                    </li>
                    <li>
                    <p id="sizeText">Sizes</p>
                    </li>
                    <li id="sizBtnLi">
                        {sizeArr.map(currSize => {
                            return <button onClick={ () => setSize(currSize)}  className={(currSize == size) ? 'sizeBtns selected' : 'sizeBtns'} type="button">{currSize}</button>
                        })}
                    </li>
                    <li>
                        <button  id="cartBtn" onClick={AddToCart}>Add to cart</button>
                    </li>
                <li>
                    <p className="prodDetail">Details</p>
                    <li>
                        <p className="prodDetail">The Nike Air Force 1 is a classic basketball shoe that has been around since 1982. It was the first basketball shoe to feature Nike Air technology, which provides lightweight cushioning. The shoe is also known for its iconic Swoosh logo, which was designed by Carolyn Davidson.</p>
                    </li>
                </li>
            </ul>
        </div>
    )
} 

export default SingleProduct