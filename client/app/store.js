import { configureStore } from '@reduxjs/toolkit';
import { use } from 'chai';
import logger from 'redux-logger';
import authSlice from '../features/Auth/authSlice';
import allProductsSlice from '../slices/products/productSlice';
import singleProductSlice from '../slices/singleProductSlice';
import userSlice from '../slices/userSlice';

const store = configureStore({
  reducer: { 
    auth: authSlice, 
    allProducts: allProductsSlice ,
    singleProduct: singleProductSlice,
    users: userSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/Auth/authSlice';
