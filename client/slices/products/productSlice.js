import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import AddProduct from '../../features/AllProducts/AllProducts';

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

export const addProductAsync = createAsyncThunk('addProduct', async ({name, description, price, imageUrl, categories})  => {
  try{
    const {data} = await axios.post('http://localhost:8080/api/products', {
      name,
      description,
      price, 
      imageUrl,
      categories
    });
    return data;
  } catch (err) {
    alert('err addProduct, check console log');
    console.log(err)
  }
})

export const deleteProductAsync = createAsyncThunk('deleteProduct', async (id) => {
  try {
    let { data } = await axios.delete('http://localhost:8080/api/products/' + id); 
    return id;
  } catch (err) {             
    console.log('this is err --->', err); 
    return err; 
  }
});

const allProductsSlice = createSlice({
    name: 'allProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            // console.log('this is action.payload --->', action.payload)
            return action.payload;
        }), 
        builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
            // console.log('this is action.payload --->', action.payload)
            return state.filter(product => product.id !== action.payload);
        }),
        builder.addCase(addProductAsync.fulfilled, (state, action) => {
            state.push(action.payload);
        })
    }
});

export const selectAllProducts = (state) => {
    // console.log('this is state.allProducts --->', state.allProducts)
    return state.allProducts;
}

export default allProductsSlice.reducer;
