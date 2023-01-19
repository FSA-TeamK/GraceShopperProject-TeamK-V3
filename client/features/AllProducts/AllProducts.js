import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { selectAllProducts } from "../../slices/products/productSlice";
import './allProducts.css'
import MainContent from "../MainContent/MainContent";
import Filter from '../Filter/Filter'
import star from '../pictures/star.png'
import { deleteProductAsync, addProductAsync, selectAllProducts } from "../../slices/products/productSlice";
// import {navigate} from "react-router-dom";


const AllProducts = () => {

    const products = useSelector(selectAllProducts)
    const user = useSelector((state) => state.auth.me);
    const dispatch = useDispatch();
    console.log("user", user)
    const handleDelete = (id) => {
        dispatch(deleteProductAsync(id))
    }

    const [productFilter, setProductFilter] = useState({
        order: 0,
        types: []
    })

    
    const [filterProducts, setFilterProducts] = useState(products)
    console.log("products----->", products)
    console.log("filterProducts", filterProducts)


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
                            {user && user.isAdmin && <button onClick={() =>handleDelete(product.id)}>Delete</button>} 
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



const AddProduct = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    // const [imageUrl, setImageUrl] = useState("");
    const [categories, setCategories] = useState("")

    const user = useSelector((state) => state.auth.me);

    // const products = useSelector(selectAllProducts);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (user && user.isAdmin) {
            let newProduct = {name, description, price, categories}
            console.log("newProduct ----->", newProduct);
            dispatch (addProductAsync(newProduct)).then(() => {
                navigate("/products");
            });
        }
    };

    return (
        <div>
            {user && user.isAdmin ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <select value = {categories} onChange={(e) => setCategories(e.target.value)}>
                        <option>Choose categories...</option>
                        <option value="ATHLETIC">Athletic</option>
                        <option value="CASUAL">Casual</option>
                    </select>
                
                    {/* <input
                        type="text"
                        placeholder="Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    /> */}

                    <button type="submit">Add Product</button>
                </form>
            ) : (
                <h1> Only Admins can add products </h1>
            )}
        </div>
    );
};
const ProductPage = () => {
    return (
        <div>
            <AllProducts />
            <AddProduct />
        </div>
    );
}

export default ProductPage;










