import React from "react";
import './payment.css'


const Payment = () => {
    return(
        <div>
            <h1 id="header">Payment Information</h1>
            <form id="form" action="/checkout">
                <div id="custInfo">
                <label htmlFor="full name">Full Name</label>
                <input className="inputs" type='text' name="full name"/>
                <label htmlFor="street address">Street Address</label>
                <input className="inputs" type='text' name="street address"/>
                <label htmlFor="city">City</label>
                <input className="inputs" type='text' name="city"/>
                <label htmlFor="state">State</label>
                <input className="inputs" type='text' name="state"/>
                <label htmlFor="zipcode">Zipcode</label>
                <input className="inputs" type='text' name="zipcode"/>
                </div>
                <div id="custCardInfo">
                <label htmlFor="full name">Full Name</label>
                <input className="inputs" type='text' name='full name'/>
                <label htmlFor="card number">Card Number</label>
                <input className="inputs" type='text' name="card number"/>
                <label htmlFor="expiration">Expiration</label>
                <input className="inputs" type='text' name="expiration"/>
                <label htmlFor="security code">Security Code</label>
                <input className="inputs" type='text' name="security code"/>
                </div>
                <input id="submit" type='submit' value='Checkout'/>
            </form>
        </div>
    )
}

export default Payment