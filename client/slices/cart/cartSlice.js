import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// const initialState = {
//     cart: [],
// }

export const fetchCartAsync = createAsyncThunk('cart', async (id) => {
  try {
    let { data } = await axios.get(`http://localhost:8080/api/cart/${id}`);
    console.log('this is cart data --->', data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
});



export const addCartAsync = createAsyncThunk(
  '/addCartItems',
  async ({ quantity, cartId, productId, name, price }) => {
    try {
      console.log('this is add cart data --->', quantity, cartId, productId, name, price);
      await axios.post(`http://localhost:8080/api/cart/${cartId}`, {
        quantity,
        cartId,
        productId,
        name,
        price,
      });
      // console.log('this is add cart data --->', data);
      const { data } = await axios.get(
        `http://localhost:8080/api/cart/${cartId}`
      );
      return data;
    } catch (err) {
      alert('err occured when adding item, check console');
      console.log(err);
    }
  }
);

export const adjustQtyAsync = createAsyncThunk(
  '/adjustQty',
  async (cartItem) => {
    try {
      const { productId, quantity, cartId } = cartItem;
      console.log('this is adjust qty data --->', cartItem)
      // const updatedCartQty = { productId, quantity, cartId };
      await axios.put(
        `http://localhost:8080/api/cart/${cartId}/${productId}`,
        cartItem
        // updatedCartQty
      );
      const { data } = await axios.get(
        `http://localhost:8080/api/cart/${cartId}`
      );
      return data;
    } catch (err) {
      alert('err occured when adjusting qty, check console');
      console.log(err.response.data);
      // console.log(err);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      // console.log('cart action', action.payload);
      const product = state.find((product) => product.id === action.payload.id);
      if (product) {
        product.quantity++;
      } else {
        state.push({ ...action.payload, quantity: 1 });
        // state.push(action.payload);
        // state.cart.push(action.payload);
      }
    },
    incrementQuantity: (state, action) => {
      const product = state.find((product) => product.id === action.payload);
      console.log('this is increment --->', state);
      console.log('this is action.payload --->', action.payload);
      product.quantity++;
    },
    decrementQuantity: (state, action) => {
      console.log('this is decrement --->', state);
      console.log('this is action.payload --->', action.payload);
      const product = state.find((product) => product.id === action.payload);
      if (product.quantity === 1) {
        product.quantity = 1;
      } else {
        product.quantity--;
      }
    },
    removeCart: (state, action) => {
      const removeCart = state.filter(
        (product) => product.id !== action.payload
      );
      return removeCart;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
      console.log('this is action.payload --->', action.payload);
      return action.payload;
    });
    builder.addCase(addCartAsync.fulfilled, (state, action) => {
      console.log('this is action.payload --->', action.payload);
      return state.push(action.payload);
    });
    builder.addCase(adjustQtyAsync.fulfilled, (state, action) => {
      console.log('EDIT action.payload  --->', action.payload);
      return action.payload;
    });
  },
});

export const selectCart = (state) => {
  // console.log('this is state.cart --->', state.cart);
  return state.cart;
};

export default cartSlice.reducer;
export const { addToCart, incrementQuantity, decrementQuantity, removeCart } =
  cartSlice.actions;
