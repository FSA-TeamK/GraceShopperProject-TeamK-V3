import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../../slices/products/productSlice";
import './allProducts.css'
import MainContent from "../MainContent/MainContent";
import Filter from '../Filter/Filter'
import star from '../pictures/star.png'

const AllProducts = () => {

    const products = useSelector(selectAllProducts)
    // console.log('this is products --->', products)

    const [productFilter, setProductFilter] = useState({
        order: 0,
        types: []
    })

    
    const [filterProducts, setFilterProducts] = useState(products)
    useEffect(() => {
        let tempProducts = [...products]
// checking which category is checked and returning accordingly
        if(productFilter.types.length){
            tempProducts = tempProducts.filter((product) => {
                return productFilter.types.includes(product.categories)
            })
        }
// checking to make sure order is a number and not a string
        if(productFilter.order){
            let sortValue = Number(productFilter.order)
// checking which sort option is selected 
        if(sortValue === 0){
            // a and b are products being compared for low to high option
            tempProducts = tempProducts.sort((a,b) => {
                return a.price - b.price
            })
            // high to low option
        }else if(sortValue === 1){
                tempProducts = tempProducts.sort((a,b) => {
                    return b.price - a.price
                })
            // a - z alphabetical option
        }else if(sortValue === 2){
                tempProducts = tempProducts.sort((a,z) => {
                    return a.name > z.name ? 1 : -1
                })
            // z - a alphabetical option
        }else if(sortValue === 3){
                tempProducts = tempProducts.sort((a,z) => {
                    return a.name < z.name ? 1 : -1
                })
            // rating option 
        }else if(sortValue === 4){
                tempProducts = tempProducts.sort((a,b) => {
                    return b.rating - a.rating
                })
        }
        }
        setFilterProducts(tempProducts)
    },[productFilter, products])

    const sortingFilter = (value) => {
        setProductFilter({...productFilter, order: value})
    }

    const categoryFilter =  (category, value) => {
        let currTypes = [...productFilter.types]
        if(value){
            currTypes.push(category.toUpperCase())
        }else{
            currTypes = currTypes.filter((type) => {
                return type !== category.toUpperCase()
            })
        }
        setProductFilter({...productFilter, types: currTypes})
    }

    return(
        <div id='allproductsDiv'>
            <Filter sortingFilter={sortingFilter} categoryFilter={categoryFilter} />
            <ul id="allProductsUl">
            {
                filterProducts.map((product) => {
                    return (
                        <div key={product.id} className="allProductsDiv">
                            <Link to={`/products/${product.id}`}>
                                <img className="homePics" src={product.imageUrl} />
                            </Link>
                            <h2 className="sneakTitle">{product.name} ${product.price}</h2>
                            <p id="categories">{product.categories}</p>
                            {Array(product.rating).fill('').map((rating, currStar) => {
                                return <img key={currStar} id="ratingStar" src={star}></img> 
                            })}
                        </div>
                    )
                    })}
            </ul>
        </div>
    )
} 

export default AllProducts