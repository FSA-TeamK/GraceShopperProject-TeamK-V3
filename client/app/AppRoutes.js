import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { me } from './store.js';
import { AllProducts, SingleProduct, Home, Checkout, Cart, AuthForm} from '../features/index.js'
import { fetchProductsAsync } from '../slices/products/productSlice';

/**
 * COMPONENT
 */

const AppRoutes = () => {
  // const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  // ADDED FOR TESTING
  const isLoggedIn = true;

  useEffect(() => {
    dispatch(fetchProductsAsync());
    dispatch(me());
  }, [dispatch]);

  return (
    <div id='routesDiv'>
      {isLoggedIn ? (
        <Routes>
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          {/* <Route path='/home' element={<Home />} /> */}
          <Route path='/:Productid' element={<SingleProduct />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
