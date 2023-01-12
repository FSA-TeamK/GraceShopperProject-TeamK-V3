import React, { useState} from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../../slices/products/productSlice";

const AllProducts = () => {
    const products = useSelector(selectAllProducts)
    // console.log('this is products --->', products)

    return(
        <div>
            <ul id="allProductsUl">
            {
                products.map((product) => {
                    return (
                        <div key={product.id} className="allProductsUl">
                            <Link to={`/products/${product.id}`}>
                                <img src={product.imageUrl} />
                            </Link>
                            <h2>{product.name}</h2>
                        </div>
                    )
                    })}
            </ul>
        </div>
    )
} 

export default AllProducts