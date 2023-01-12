import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authSlice from '../features/Auth/authSlice';
import allProductsSlice from '../slices/products/productSlice';

const store = configureStore({
  reducer: { 
    auth: authSlice, 
    allProducts: allProductsSlice 
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/Auth/authSlice';
