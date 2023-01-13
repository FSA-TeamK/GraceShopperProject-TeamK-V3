import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsersAsync = createAsyncThunk ("/users", async () => {
    try {
        const {data} = await axios.get("http://localhost:8080/api/users");
        return data;
    } catch (err) {
        alert ("err occured for fetchUser, check console");
        console.log(err)
    }
});

export const addUserAsync = createAsyncThunk ("/addUser", async ({username, email, password}) => {
    try {
        const {data} = await axios.post("http://localhost:8080/api/users", {
            username,
            email,
            password
        });
        return data;
    } catch(err) {
        alert("err occursed for addUser, check console");
    }
});

const usersSlice = createSlice ({
    name: "users",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(addUserAsync.fulfilled, (state, action) => {
            state.push(action.payload);
        });
    }
});

export const selectUser = (state) => state.users;

export default usersSlice.reducer;