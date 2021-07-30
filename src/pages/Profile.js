import { CssBaseline } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header/Header";
import UserData from "../components/Profile/UserData";
import { fetchCurrentUser } from "../store/authSlice";

const Profile = () => {
  const { auth, currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, []);

  return (
    <CssBaseline>
      <Header auth={auth} currentUser={currentUser} />
      {auth ? <UserData currentUser={currentUser} /> : null}
    </CssBaseline>
  );
};

export default Profile;
