import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProductAsync, selectSingleProduct } from "../../slices/singleProductSlice";


const SingleProduct = () => {

    const dispatch = useDispatch();
    const {id} = useParams();

    const singleProduct = useSelector(selectSingleProduct);

    console.log("single",singleProduct);

    useEffect(() => {
        dispatch(fetchSingleProductAsync(id));
    }, []);

    return (
        <div>
            <h1>Single Product</h1>
            <p>{singleProduct.name}</p>
            <p>{singleProduct.description}</p>
            <p>{singleProduct.price}</p>
            <p>{singleProduct.quantity}</p>
            <img src={singleProduct.imageUrl} />
        </div>
    );
}


export default SingleProduct;