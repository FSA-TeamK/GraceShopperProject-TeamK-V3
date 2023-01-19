import React from "react";
import { Link } from "react-router-dom";
import './footer.css'


const Footer = () => {
// placeholder functions for buttons 
    const AthleticBtn = () => {
        console.log('filter athletic sneakers')
      }
    
      const CasualBtn = () => {
        console.log('filter casual sneakers')
      }
    
      const SearchSneaks = () => {
        console.log('sneakers searched')
      }

    return(
    // need to work on routes
        <nav id="footerNav">
            <ul id="footerUl">
                <li className="footerLi">
                <Link className='navLinks' to="/home">Shop</Link>
                <button className='sneakBtns' type='button' onClick={AthleticBtn}>Athletic</button>
                <button className='sneakBtns' type='button' onClick={CasualBtn}>Casual</button>
                </li>
                <li className="footerLi">
                <Link className='navLinks' to="/home">Our Story</Link>
                <Link className='navLinks' to="/home">About</Link>
                </li>
                <li className="footerLi">
                <Link className='navLinks' to="/home">Help</Link>
                <p>1 800-RandomShoes</p>
                <p>help@randomshoes.com</p>
                </li>
            </ul>
                <ul id="socials">
                    <li className="socialLi">Twitter</li>
                    <li className="socialLi">Facebook</li>
                    <li className="socialLi">Instagram</li>
                </ul>
        </nav>
        
    )
}

export default Footer