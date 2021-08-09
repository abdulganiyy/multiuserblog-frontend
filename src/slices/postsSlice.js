import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get("http://localhost:8000/posts");

  return response.data;
});

export const fetchPost = createAsyncThunk("posts/fetchPost", async (id) => {
  const response = await axios.get(`http://localhost:8000/posts/${id}`);

  return response.data;
});

export const createPost = createAsyncThunk("posts/createPost", async (data) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    "http://localhost:8000/posts",
    data,
    config
  );

  return response.data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    status: "pending",
    posts: null,
    post: null,
    error: null,
  },
  reducers: {},

  extraReducers: {
    [fetchPosts.fulfilled]: (state, action) => {
      const { posts } = action.payload;

      state.posts = posts;
    },
    [createPost.fulfilled]: (state, action) => {
      const { post } = action.payload;

      state.posts = [...state.posts, post];
    },
    [fetchPost.fulfilled]: (state, action) => {
      const { post } = action.payload;

      state.post = post;
    },
  },
});

export const postsActions = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
