import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwt from "jsonwebtoken";

const initialState = {
  status: "loggedout",
  user: null,
  error: null,
};
const token = localStorage.getItem("token");

if (token) {
  const decoded = jwt.decode(token);

  if (decoded) {
    initialState.status = "loggedin";
    initialState.user = decoded;
  }
}

export const login = createAsyncThunk("user/login", async (data) => {
  const response = await axios.post(
    "https://multiuserblog-backend.herokuapp.com/users/login",
    data
  );

  return response.data;
});

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (data) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.patch(
      "https://multiuserblog-backend.herokuapp.com/users/update",
      data,
      config
    );

    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.deleteItem("token");
      state.status = "loggedout";
      state.user = null;
    },
  },

  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const { token, user } = action.payload;

      localStorage.setItem("token", token);
      state.user = user;
      state.status = "loggedin";
    },
    [updateProfile.fulfilled]: (state, action) => {
      const { user } = action.payload;

      state.user = user;
    },
  },
});

export const userActions = userSlice.actions;

export const userReducer = userSlice.reducer;
