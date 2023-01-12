import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const initialState = [];

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
    },
    reducers: {
        addToCart: (state, action) => {
            state.cart.push(action.payload);
    },
    incrementQuantity: (state, action) => {
        const product = state.cart.find((product) => product.id === action.payload);
        product.quantity++;
    },
    decrementQuantity: (state, action) => {
        const product = state.cart.find((product) => product.id === action.payload);
        if (product.quantity > 1) {
            product.quantity--;
        }
    },
    removeCart: (state, action) => {
        const removeCart = state.cart.filter((product) => product.id !== action.payload);
        state.cart = removeCart;
},
    },
})

export const cartReducer = cartSlice.reducer;
export const { addToCart, incrementQuantity, decrementQuantity, removeCart } = cartSlice.actions;