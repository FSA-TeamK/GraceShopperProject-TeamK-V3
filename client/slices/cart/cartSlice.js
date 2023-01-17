import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// const initialState = {
//     cart: [{ id: 1, name: 'Nike Air Force 1', price: 100, quantity: 1 }, { id: 2, name: 'Nike Air Max 90', price: 120, quantity: 1}],
// }

// const initialState= [{
//     id: 1,
//     name: "Nike Air Force 1",
//     description: "The Nike Air Force 1 is a classic basketball shoe that has been around since 1982. It was the first basketball shoe to feature Nike Air technology, which provides lightweight cushioning. The shoe is also known for its iconic Swoosh logo, which was designed by Carolyn Davidson.",
//     price: 100,
//     rating: 4,
//     imageUrl: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-mens-shoes-5QFp5Z.png",
//     categories: "CASUAL",
// }]

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

// export const fetchUserCartAsync = createAsyncThunk('userCart', async (id) => {
//   try{
//     let {data} = await axios.get(`http://localhost:8080/api/cart/${id}`);
//     return data;
//   } catch(err){
//     alert('err occured when fetching userCart, check console');
//     console.log(err);
//   }
// })

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
      const { id, quantity, cartId } = cartItem;
      const updatedCartQty = { id, quantity, cartId };
      await axios.put(
        `http://localhost:8080/api/cart/${cartId}/${id}`,
        updatedCartQty
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
    // builder.addCase(fetchUserCartAsync.fulfilled, (state, action) => {
    //   console.log('this is action.payload --->', action.payload);
    //   return action.payload;
    // });
    builder.addCase(adjustQtyAsync.fulfilled, (state, action) => {
      console.log('this is action.payload --->', action.payload);
      return action.payload;
    });
  },
});

export const selectCart = (state) => {
  console.log('this is state.cart --->', state.cart);
  return state.cart;
};

export default cartSlice.reducer;
export const { addToCart, incrementQuantity, decrementQuantity, removeCart } =
  cartSlice.actions;
