import { CssBaseline } from "@material-ui/core";
import React from "react";
import Header from "../components/Header/Header";
import Modal from "../components/Header/Modal";
import Post from "../pages/Post";
import Posts from "../components/Posts/Posts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCurrentUser } from "../store/authSlice";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const Main = () => {
  const [openModal, setModalOpen] = React.useState(false);
  const [login, setLogin] = React.useState(true);
  const [signUp, setSignUp] = React.useState(false);
  const { auth, currentUser, errorAuth } = useSelector((state) => state.auth);
  const posts = useSelector((state) => state.posts);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const pageSize = 8;
  const [next, setNext] = React.useState(8);
  const [visiblePosts, setVisiblePosts] = React.useState([]);
  let postsArr = [];
  const loginError = useSelector((state) => state.auth.error);
  const postsError = useSelector((state) => state.posts.error);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, []);

  const addPosts = (start, end) => {
    const slicedPosts = posts.posts.slice(start, end);
    postsArr = [...postsArr, ...slicedPosts];
    setVisiblePosts(postsArr);
  };

  useEffect(() => {
    setOpen(true);
  }, [loginError, postsError]);

  useEffect(() => {
    addPosts(0, next);
  }, [posts, next]);

  return (
    <CssBaseline>
      <Header
        openModal={openModal}
        setModalOpen={setModalOpen}
        setLogin={setLogin}
        setSignUp={setSignUp}
        currentUser={currentUser}
        loginError={loginError}
        auth={auth}
      />
      <Modal
        openModal={openModal}
        setModalOpen={setModalOpen}
        login={login}
        signUp={signUp}
      />
      <Posts
        component={Post}
        visiblePosts={visiblePosts}
        pageSize={pageSize}
        next={next}
        setNext={setNext}
      />
      {errorAuth.isError || postsError.isError ? (
        <Snackbar open={open} autoHideDuration={5000}>
          <Alert severity="error">
            {login.isError
              ? errorAuth.message
              : postsError.isError
              ? postsError.message
              : null}
          </Alert>
        </Snackbar>
      ) : null}
    </CssBaseline>
  );
};

export default Main;
