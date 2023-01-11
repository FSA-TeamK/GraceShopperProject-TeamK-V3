import React from 'react';
import { useSelector } from 'react-redux';
import AllProducts from '../../../src/components/AllProducts'
import MainContent from '../../../src/components/MainContent'
import SingleProduct from '../../../src/components/SingleProduct';

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
