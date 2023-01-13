import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

export const fetchSingleProductAsync = createAsyncThunk(
    "singleProduct",
    async (id) => { 
        try {
            let { data } = await axios.get(`http://localhost:8080/api/products/${id}`);
            // console.log("this is single data --->", data)
            return data;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
)

const singleProductSlice = createSlice({
    name: "singleProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
            // console.log("this is single action.payload --->", action.payload)
            return action.payload;
        });
    }
})

export const selectSingleProduct = (state) => {
    // console.log("this is state.singleProduct --->", state.singleProduct)
    return state.singleProduct;
}

export default singleProductSlice.reducer;