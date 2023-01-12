import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserCartAsync = createAsyncThunk ("/users/cart/:userId", async (userid) => {
    try{ 
        const {data} = await axios.get(`http://localhost:3000/api/users/cart/${userid}`);
        return data;
    } catch(err) {
        alert("err occuered fetching user cart, check console!");
        console.log(err);
    }
});


export const deleteItem = createAsyncThunk ("/users/cart/:userId/:productId", async ())