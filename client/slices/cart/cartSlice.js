import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const initialState = {
//     cart: [{ id: 1, name: 'Nike Air Force 1', price: 100, quantity: 1 }, { id: 2, name: 'Nike Air Max 90', price: 120, quantity: 1}],
// }

// const initialState = {
//     cart: [],
// }

export const fetchCartAsync = createAsyncThunk(
    "cart",
    async () => {
        try {
            let { data } = await axios.get(`http://localhost:8080/api/users/cart`);
            console.log("this is cart data --->", data)
            return data;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
) 

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            console.log('cart action', action.payload)
            state.push(action.payload);
            // state.cart.push(action.payload);
    },
//     incrementQuantity: (state, action) => {
//         const product = state.cart.find((product) => product.id === action.payload);
//         product.quantity++;
//     },
//     decrementQuantity: (state, action) => {
//         const product = state.cart.find((product) => product.id === action.payload);
//         if (product.quantity > 1) {
//             product.quantity--;
//         }
//     },
//     removeCart: (state, action) => {
//         const removeCart = state.cart.filter((product) => product.id !== action.payload);
//         state.cart = removeCart;
// },
    },
})

export const selectCart = (state) => {
    console.log('this is state.cart --->', state.cart)
    return state.cart;
}

export default cartSlice.reducer;
export const { addToCart, incrementQuantity, decrementQuantity, removeCart } = cartSlice.actions;