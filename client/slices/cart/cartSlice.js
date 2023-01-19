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
      // console.log('this is add cart data --->', quantity, cartId, productId, name, price);
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
      // console.log('this is adjust qty data --->', cartItem)
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
      console.log(err);
    }
  }
);

export const removeItemAsync = createAsyncThunk(
  '/removeItem',
  async (cartItem) => {
    try {
      const { productId, cartId } = cartItem;
      console.log('this is remove item data --->', cartItem);
      await axios.delete(`http://localhost:8080/api/cart/${cartId}/${productId}`);
      const { data } = await axios.get(
        `http://localhost:8080/api/cart/${cartId}`
      );
      return data;
    } catch (err) {
      alert('err occured when removing item, check console');
      console.log(err);
    }
  }
)

// const local = localStorage.getItem('local') ? JSON.parse(localStorage.getItem('local')) : [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      // console.log('cart add action', action.payload);
      const product = state.find((product) => product.id === action.payload.id);
      if (product) {
        product.quantity++;
      } else {
        state.push({ ...action.payload, quantity: 1 });
        // state.push(action.payload);
      }
      // localStorage.setItem('local', JSON.stringify(state));
    },
    incrementQuantity: (state, action) => {
      const product = state.find((product) => product.id === action.payload);
      // console.log('this is increment --->', state);
      // console.log('this is action.payload --->', action.payload);
      product.quantity++;
      // localStorage.setItem('local', JSON.stringify(state));
    },
    decrementQuantity: (state, action) => {
      // console.log('this is decrement --->', state);
      // console.log('this is action.payload --->', action.payload);
      const product = state.find((product) => product.id === action.payload);
      if (product.quantity === 1) {
        product.quantity = 1;
      } else {
        product.quantity--;
      }
      // localStorage.setItem('local', JSON.stringify(state));
    },
    removeCart: (state, action) => {
      const removeCart = state.filter(
        (product) => product.id !== action.payload
        );
        // localStorage.setItem('local', JSON.stringify(removeCart));
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
    builder.addCase(removeItemAsync.fulfilled, (state, action) => {
      console.log('REMOVE action.payload  --->', action.payload);
      // const deleteState = state.filter((item) => item.id != action.payload.id);
      // return deleteState;
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
