import React from "react";
import homePic from '../pictures/home2.jpeg'

const MainContent = () => {
// placeholder functions for buttons
    const AthleticBtn = () => {
        console.log('filter athletic sneakers')
      }
    
      const CasualBtn = () => {
        console.log('filter casual sneakers')
      }

    return(
        <div id="mainContent">
            <img id="homePic" src={homePic}/>
            <nav>
            <button className='filterBtns' type='button' onClick={AthleticBtn}>Athletic</button>
          <button className='filterBtns' type='button' onClick={CasualBtn}>Casual</button>
            </nav>
        </div>
    )
}


export default MainContent




