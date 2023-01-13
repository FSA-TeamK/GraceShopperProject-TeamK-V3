import React from 'react';
import { useSelector } from 'react-redux';
import {AllProducts, MainContent, SingleProduct} from '../index'

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);

  
  return (
    <div>
      <MainContent />
      <AllProducts />
    </div>
  );
  
};

export default Home;
