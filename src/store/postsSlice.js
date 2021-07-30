import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("fetch/posts", async () => {
  const res = await axios.get(
    "https://nodejs-test-api-blog.herokuapp.com/api/v1/posts?limit=20&skip=10"
  );
  return res.data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = [...state.posts, ...action.payload];
    });
  },
});

export default postsSlice.reducer;
