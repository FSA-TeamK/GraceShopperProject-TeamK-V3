import React from "react";
import Checkout from '../Checkout/Checkout';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const Cart = () => {
    const cart = useSelector((state) => state.cart);

    return(
        <div id="cartDiv">
            <p id="cartText">My Cart</p>
            {
                cart?.map((product) => { 
                    // <CartProduct
                    //     <div>
                    //         <img src={product.imageUrl} alt="BLANK" />
                    //         <p>{product.name}</p>
                    //         <p>${product.price}</p>
                    //         <p>Quantity: {product.quantity}</p>
                    //     </div>
                    
                }
            )}
            <Link id="checkout" to='/checkout'>Proceed to checkout</Link>
        </div>
    )
} 





export default Cart