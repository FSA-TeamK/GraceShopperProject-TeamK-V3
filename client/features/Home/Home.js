import React from 'react';
import { useSelector } from 'react-redux';
import HomeSneaks from '../pictures/HomeSneaks.jpeg'
import './home.css'

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div id='homeDiv'>
      <img id='homePic' src={HomeSneaks}/>
    </div>
  );
  
};

export default Home;
