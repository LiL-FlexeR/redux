import { CssBaseline } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import Modal from "../components/Header/Modal";
import Description from "../components/Posts/Description";
import { fetchPost } from "../store/postSlice";
import { fetchCurrentUser } from "../store/authSlice";

const Post = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [login, setLogin] = React.useState(true);
  const [signUp, setSignUp] = React.useState(false);
  const { auth, currentUser } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(fetchPost(id));
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, []);

  return (
    <CssBaseline>
      <Header
        open={open}
        setOpen={setOpen}
        setLogin={setLogin}
        setSignUp={setSignUp}
        auth={auth}
        currentUser={currentUser}
      />
      <Modal setOpen={setOpen} open={open} login={login} signUp={signUp} />
      <Description />
    </CssBaseline>
  );
};

export default Post;
