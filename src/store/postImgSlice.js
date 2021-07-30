import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postImg = createAsyncThunk("post/img", async (image, user) => {
  const res = axios.put(
    `https://nodejs-test-api-blog.herokuapp.com/api/v1/users/upload/${user.id}`,
    { avatar: image }
  );
  console.log(res.data);
  return res.data;
});
