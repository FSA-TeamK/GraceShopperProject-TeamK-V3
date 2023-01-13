import React from "react";
import Checkout from '../Checkout/Checkout';
import { Link } from "react-router-dom";
import './cart.css'




const Cart = () => {
    return(
        <div id="cartDiv">
            <p id="cartText">My Cart</p>
            <Link id="checkout" to='/checkout'>Proceed to checkout</Link>
        </div>
    )
} 





export default Cart