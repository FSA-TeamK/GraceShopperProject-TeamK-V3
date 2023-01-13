import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProductAsync, selectSingleProduct } from "../../slices/singleProductSlice";
import './singleProduct.css'


const SingleProduct = () => {

    const dispatch = useDispatch();
    const {id} = useParams();

    const singleProduct = useSelector(selectSingleProduct);

    console.log("single",singleProduct);

    useEffect(() => {
        dispatch(fetchSingleProductAsync(id));
    }, []);

    // For Size Buttons
    const [size, setSize] = useState(null)
     const sizeArr = []
     let n = 5 
     while(n <= 12.5){
        sizeArr.push(n)
        n = n + 0.5
     }


const AddToCart = () => {
    console.log('added to cart')
}

return(
    <div id="singProdDiv">
        <img id="singProdImg" src={singleProduct.imageUrl} />
        <ul id="singProdUl">
            <li>
                <p id="sneakTitle">{singleProduct.name}</p>
                </li>
                <li>
                <p id="price">${singleProduct.price}</p>
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
                    <p className="prodDetail">{singleProduct.description}</p>
                </li>
            </li>
        </ul>
    </div>
)
} 

export default SingleProduct  