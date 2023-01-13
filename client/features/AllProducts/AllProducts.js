import React, { useState} from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../../slices/products/productSlice";
import './allProducts.css'
import MainContent from "../MainContent/MainContent";

const AllProducts = () => {
    const products = useSelector(selectAllProducts)
    // console.log('this is products --->', products)

    return(
        <div>
            <MainContent />
            <ul id="allProductsUl">
            {
                products.map((product) => {
                    return (
                        <div key={product.id} className="allProductsUl">
                            <Link to={`/products/${product.id}`}>
                                <img className="homePics" src={product.imageUrl} />
                            </Link>
                            <h2 className="sneakTitle">{product.name}</h2>
                        </div>
                    )
                    })}
            </ul>
        </div>
    )
} 

export default AllProducts