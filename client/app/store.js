import { configureStore } from '@reduxjs/toolkit';
import { use } from 'chai';
import logger from 'redux-logger';
import authSlice from '../features/Auth/authSlice';
import allProductsSlice from '../slices/products/productSlice';
import singleProductSlice from '../slices/products/singleProductSlice';
import userSlice from '../slices/userSlice';
import cartSlice  from '../slices/cart/cartslice';
// import {persistStore, persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//   key: 'root',
//   storage,
// }

// const persistedReducer = persistReducer(persistConfig, cartSlice)

const store = configureStore({
  reducer: { 
    // reducer: persistedReducer,
    auth: authSlice, 
    allProducts: allProductsSlice,
    singleProduct: singleProductSlice,
    cart: cartSlice,
    users: userSlice
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
// export const persitor = persistStore(store);
export * from '../features/Auth/authSlice';

