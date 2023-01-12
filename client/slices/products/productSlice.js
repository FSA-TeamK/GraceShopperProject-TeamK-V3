import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = []; // <--- this is where the initial state is being set

export const fetchProductsAsync = createAsyncThunk('allProducts', async () => {
  try {
    let { data } = await axios.get('http://localhost:8080/api/products'); 
    // console.log('this is data --->', data); //* <--- this is where the data is being returned
    return data;
  } catch (err) {             // <--- this is where the error is being caught    changed error to err and added notes-sal 
    console.log('this is err --->', err); 
    return err; // <--- this is where the error is being returned
  }
});

const allProductsSlice = createSlice({
    name: 'allProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            console.log('this is action.payload --->', action.payload)
            return action.payload;
        });
    }
});

export const selectAllProducts = (state) => {
    // console.log('this is state.allProducts --->', state.allProducts)
    return state.allProducts;
}

export default allProductsSlice.reducer;