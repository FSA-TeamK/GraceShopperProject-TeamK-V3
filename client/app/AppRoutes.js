import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { me } from './store.js';
import { AllProducts, SingleProduct, Home, Checkout, Cart, AuthForm, SignUp} from '../features/index.js'
import { fetchProductsAsync } from '../slices/products/productSlice';

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  // ADDED FOR TESTING
  // const isLoggedIn = false;

  useEffect(() => {
    dispatch(fetchProductsAsync());
    dispatch(me());
  }, [dispatch]);

  return (
    <div id='routesDiv'>
      {isLoggedIn ? (
        <Routes>
          <Route path='/products' element={<AllProducts />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/products/:id' element={<SingleProduct />} />         
          <Route path='/home' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/"
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
