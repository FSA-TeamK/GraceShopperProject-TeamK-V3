import React from 'react';
import { useSelector } from 'react-redux';
import AllProducts from '../AllProducts'
import MainContent from '../MainContent'
import SingleProduct from '../SingleProduct';

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
