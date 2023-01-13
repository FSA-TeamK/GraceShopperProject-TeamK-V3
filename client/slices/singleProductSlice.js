import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchSingleProductAsync = createAsyncThunk(
    "SingleProduct",
    async (id) => {
        try {
            let { data } = await axios.get(
                `http://localhost:8080/api/products/${id}`
            );
            // console.log('this is data --->', data); //* <--- this is where the data is being returned
            return data;
        } catch (err) {
            // <--- this is where the error is being caught
            console.log("this is err --->", err);
            return err; // <--- this is where the error is being returned
        }
    }
);

const singleProductSlice = createSlice({
    name: "SingleProduct",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
            // console.log("singleAction", action.payload);
            return action.payload;
        });
    }
});

export const selectSingleProduct = (state) => {
    // console.log('this is state.allProducts --->', state.allProducts)
    return state.singleProduct;
}

export default singleProductSlice.reducer;