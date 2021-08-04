import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("fetch/posts", async () => {
  const res = await axios.get(
    "https://nodejs-test-api-blog.herokuapp.com/api/v1/posts?limit=300&skip=10"
  );
  return res.data;
});

export const createPost = createAsyncThunk(
  "fetch/create-post",
  async (postData) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      "https://nodejs-test-api-blog.herokuapp.com/api/v1/posts",
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);
    return res.data;
  }
);

export const deletePost = createAsyncThunk("delete/post", async (id) => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(
    `https://nodejs-test-api-blog.herokuapp.com/api/v1/posts/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    error: {
      isError: false,
      message: "",
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = [...action.payload];
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.error = {
        isError: true,
        message: action.error.message,
      };
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.posts.push(action.payload);
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.error = {
        isError: true,
        message: action.error.message,
      };
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.meta.arg);
      console.log(state.posts);
    });
  },
});

export default postsSlice.reducer;
