import React from "react";
import {useSelector} from 'react-redux'
import AllProducts from '../AllProducts/AllProducts.js'
import athletic1 from "../pictures/ath1.jpeg"


// single product page sample 
// trying to figure out some code to avoid hard coding each product

const SingleProduct = () => {
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
                    <button className="sizeBtns" type="button">5</button>
                    <button className="sizeBtns" type="button">5.5</button>
                    <button className="sizeBtns" type="button">6</button>
                    <button className="sizeBtns" type="button">6.5</button>
                    <button className="sizeBtns" type="button">7</button>
                    <button className="sizeBtns" type="button">7.5</button>
                    <button className="sizeBtns" type="button">8</button>
                    <button className="sizeBtns" type="button">8.5</button>
                    <button className="sizeBtns" type="button">9</button>
                    <button className="sizeBtns" type="button">9.5</button>
                    <button className="sizeBtns" type="button">10</button>
                    <button className="sizeBtns" type="button">10.5</button>
                    <button className="sizeBtns" type="button">10.5</button>
                    <button className="sizeBtns" type="button">11</button>
                    <button className="sizeBtns" type="button">11.5</button>
                    <button className="sizeBtns" type="button">12</button>
                    </li>
                    <li>
                        <button id="cartBtn" onClick={AddToCart}>Add to cart</button>
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