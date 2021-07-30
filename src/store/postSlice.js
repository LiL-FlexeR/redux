import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPost = createAsyncThunk("fetch/post", async (postId) => {
  const res = await axios.get(
    `https://nodejs-test-api-blog.herokuapp.com/api/v1/posts/${postId}`
  );
  return res.data;
});

const postSlice = createSlice({
  name: "post",
  initialState: {
    post: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.post = action.payload;
    });
  },
});

export default postSlice.reducer;
