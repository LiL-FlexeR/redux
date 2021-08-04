import { CssBaseline } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header/Header";
import CreatePost from "../components/Profile/CreatePost";
import UserData from "../components/Profile/UserData";
import { fetchCurrentUser } from "../store/authSlice";
import UserPosts from "../components/Profile/UserPosts";
import Alert from "@material-ui/lab/Alert";
import { Redirect, useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";

const Profile = () => {
  const { auth, currentUser, errorAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const token = localStorage.getItem("token");
  const errorPosts = useSelector((state) => state.posts.error);
  const history = useHistory();

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, []);

  React.useEffect(() => {
    setOpen(true);
  }, [, errorPosts, errorAuth]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <CssBaseline>
      <Header auth={auth} currentUser={currentUser} />
      {auth ? (
        <div style={{ width: "80%", margin: "0 auto", marginTop: "10rem" }}>
          <CreatePost />
          <UserPosts currentUser={currentUser} />
          <UserData currentUser={currentUser} errorAuth={errorAuth} />
          {errorPosts.isError || errorAuth.isError ? (
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
                {errorAuth.message}
              </Alert>
            </Snackbar>
          ) : null}
        </div>
      ) : null}
    </CssBaseline>
  );
};

export default Profile;
