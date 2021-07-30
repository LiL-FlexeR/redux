import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postSlice from "./postSlice";
import postsSlice from "./postsSlice";
import authSlice from "./authSlice";
import usersSlice from "./usersSlice";

export default configureStore({
  reducer: {
    posts: postsSlice,
    post: postSlice,
    auth: authSlice,
    users: usersSlice,
  },
});
