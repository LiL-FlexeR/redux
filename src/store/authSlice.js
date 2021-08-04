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

export const deleteUser = createAsyncThunk("delete/user", async (id) => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(
    `https://nodejs-test-api-blog.herokuapp.com/api/v1/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: {},
    auth: false,
    admin: false,
    errorAuth: {
      isError: null,
      message: "",
    },
  },
  reducers: {
    resetUser: (state) => {
      state = {
        currentUser: {},
        auth: false,
        admin: false,
        errorAuth: {
          isError: false,
          message: "",
        },
      };
    },
    reset: (state) => {
      state.errorAuth = {
        isError: false,
        message: "",
      };
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
      state.error = {
        isError: false,
        message: "",
      };
      if (state.currentUser.email === "nikita.flexerinio@gmail.com") {
        state.admin = true;
      }
    });
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.error = {
        isError: true,
        message: action.error.message,
      };
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      console.log(state.errorAuth);
      state.errorAuth = {
        isError: false,
        message: "",
      };
      localStorage.removeItem("token");
      console.log(state.errorAuth);
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      console.log(state.errorAuth);
      state.errorAuth = {
        isError: true,
        message: action.error.message,
      };
      console.log(state.errorAuth);
    });
  },
});

export default authSlice.reducer;
export const { reset, resetUser } = authSlice.actions;
