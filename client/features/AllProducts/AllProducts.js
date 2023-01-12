import athletic1 from "../pictures/ath1.jpeg"
import casual1 from "../pictures/cas1.jpeg"
import athletic2 from "../pictures/ath2.jpeg"
import casual2 from "../pictures/cas2.jpeg"
import athletic3  from "../pictures/ath3.jpeg"
import casual3 from "../pictures/cas3.jpeg"
import athletic4  from "../pictures/ath4.jpeg"
import casual4 from "../pictures/cas4.jpeg"
import athletic5 from "../pictures/ath5.jpeg"
import casual5 from "../pictures/cas5.jpeg"
import athletic6  from "../pictures/ath6.jpeg"
import casual6 from "../pictures/cas6.jpeg"

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
                {/* sample for link to single product page */}
                <li> <Link to='/001'><img className="homePics" src={athletic1}/></Link>
                {/* end of sample */}
                <p className="sneakTitle" >Athletic Runner</p></li>
                <li> <img className="homePics" src={casual1}/>
                <p className="sneakTitle" >Casual Dweller</p></li>
                <li> <img className="homePics" src={athletic2}/>
                <p className="sneakTitle" >Athletic Runner</p></li>
                <li> <img className="homePics" src={casual2}/>
                <p className="sneakTitle" >Casual Dweller</p></li>
                <li> <img className="homePics" src={athletic3}/>
                <p className="sneakTitle" >Athletic Runner</p></li>
                <li> <img className="homePics" src={casual3}/>
                <p className="sneakTitle" >Casual Dweller</p></li>
                <li> <img className="homePics" src={athletic4}/>
                <p className="sneakTitle" >Athletic Runner</p></li>
                <li> <img className="homePics" src={casual4}/>
                <p className="sneakTitle" >Casual Dweller</p></li>
                <li> <img className="homePics" src={athletic5}/>
                <p className="sneakTitle" >Athletic Runner</p></li>
                <li> <img className="homePics" src={casual5}/>
                <p className="sneakTitle" >Casual Dweller</p></li>
                <li> <img className="homePics" src={athletic6}/>
                <p className="sneakTitle" >Athletic Runner</p></li>
                <li> <img className="homePics" src={casual6}/>
                <p className="sneakTitle" >Casual Dweller</p></li>
            </ul>
            <ul>
            {
                products.map((product) => {
                    return (
                        <div key={product.id}>
                            <Link to={`${product.id}`}>
                                <img src={product.imageUrl} />
                            </Link>
                            <p>{product.description}</p>
                            <p>{product.price}</p>
                        </div>
                    )
                    })}
            </ul>
        </div>
    )
} 

export default AllProducts