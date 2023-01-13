import React from 'react';
import { useSelector } from 'react-redux';
import AllProducts from '../AllProducts/AllProducts.js'
import MainContent from '../MainContent/MainContent'
import SingleProduct from '../SingleProduct/SingleProduct';

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div>
      <MainContent />
    </div>
  );
  
};

export default Home;
