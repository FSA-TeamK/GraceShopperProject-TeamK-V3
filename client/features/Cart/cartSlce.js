import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import router from "../../../server/api/users";
import User from "../../../server/db/models/User"

