import React from "react";
import { Link } from "react-router-dom";
import homePic from '../pictures/home2.jpeg'
import './mainContent.css'

const MainContent = () => {

    return(
        <div id="mainContent">
            <img id="homePic" src={homePic}/>
            <nav>
              {/* <button className='filterBtns' type='button'>Athletic</button> */}
              <Link to="/products" ><button className='filterBtns' type='button'>Explore</button></Link>
              {/* <button className='filterBtns' type='button'>Casual</button> */}
            </nav>
        </div>
    )
}


export default MainContent




