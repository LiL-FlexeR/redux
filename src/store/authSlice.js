import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAuth = createAsyncThunk("fetch/auth", async (authData) => {
  const res = await axios.post(
    "https://nodejs-test-api-blog.herokuapp.com/api/v1/auth",
    authData
  );
  return res.data;
});

export const fetchCurrentUser = createAsyncThunk(
  "fetch/current-user",
  async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      "https://nodejs-test-api-blog.herokuapp.com/api/v1/auth/user",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: {},
    auth: false,
    admin: false,
  },
  reducers: {
    reset: (state, action) => {
      state.auth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      const token = action.payload.token;
      localStorage.setItem("token", token);
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.auth = true;
      if (state.currentUser.email === "nikita.flexerinio@gmail.com") {
        state.admin = true;
      }
    });
  },
});

export default authSlice.reducer;
export const { reset } = authSlice.actions;
