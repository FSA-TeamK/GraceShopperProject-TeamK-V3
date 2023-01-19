import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { selectAllProducts } from "../../slices/products/productSlice";
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

    return(
        <div>
            <ul id="allProductsUl">
            {
                products.map((product) => {
                    return (
                        <div key={product.id} className="allProductsUl">
                            {user && user.isAdmin && <button onClick={() =>handleDelete(product.id)}>Delete</button>} 
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



const AddProduct = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [categories, setCategories] = useState("")

    const user = useSelector((state) => state.auth.me);

    const products = useSelector(selectAllProducts);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (user && user.isAdmin) {
            let newProduct = {name, description, price, imageUrl, categories}
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
                        <option value="ATHLETIC">Athletic</option>
                        <option value="CASUAL">Casual</option>
                    </select>
                
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
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










