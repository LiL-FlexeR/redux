import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

export const fetchPost = createAsyncThunk("fetch/post", async (postId) => {
  const res = await axios.get(
    `https://nodejs-test-api-blog.herokuapp.com/api/v1/posts/${postId}`
  );
  return res.data;
});

export const updatePost = createAsyncThunk("update/post", async (patchData) => {
  const token = localStorage.getItem("token");
  const res = await axios.patch(
    `https://nodejs-test-api-blog.herokuapp.com/api/v1/posts/${patchData.postId}`,
    patchData.editedData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
});

export const fetchPostImage = createAsyncThunk("put/post", async (putData) => {
  const token = localStorage.getItem("token");
  const res = await axios.put(
    `https://nodejs-test-api-blog.herokuapp.com/api/v1/posts/upload/${putData.postId}`,
    putData.image,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
});

export const likePost = createAsyncThunk(
  "put/like",
  async ({ postId, post, userId }) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      `https://nodejs-test-api-blog.herokuapp.com/api/v1/posts/like/${postId}`,
      postId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    post: {},
    error: {
      message: "",
      isError: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.post = action.payload;
    });
    builder.addCase(fetchPost.rejected, (state, action) => {
      state.error = {
        isError: true,
        message: action.error.message,
      };
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.post = action.payload;
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.error = {
        massege: action.error.message,
        isError: true,
      };
    });
    builder.addCase(fetchPostImage.fulfilled, (state, action) => {
      state.post = { ...state.post, ...action.payload };
    });
    builder.addCase(likePost.fulfilled, (state, action) => {
      const args = action.meta.arg;
      const newLikes = args.post.likes.includes(args.userId)
        ? args.post.likes.filter((like) => like !== args.userId)
        : [...args.post.likes, args.userId];
      state.post.likes = newLikes;
    });
    builder.addCase(likePost.rejected, (state, action) => {
      state.error = {
        massege: action.error.message,
        isError: true,
      };
    });
  },
});

export default postSlice.reducer;
