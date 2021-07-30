import { CssBaseline } from "@material-ui/core";
import React from "react";
import Header from "../components/Header/Header";
import Modal from "../components/Header/Modal";
import Post from "../pages/Post";
import Posts from "../components/Posts/Posts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCurrentUser } from "../store/authSlice";

const Main = () => {
  const [open, setOpen] = React.useState(false);
  const [login, setLogin] = React.useState(true);
  const [signUp, setSignUp] = React.useState(false);
  const { auth, currentUser } = useSelector((state) => state.auth);
  const posts = useSelector((state) => state.posts);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const pageSize = 8;
  const [next, setNext] = React.useState(8);
  const [visiblePosts, setVisiblePosts] = React.useState([]);
  let postsArr = [];

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

  console.log(visiblePosts);

  useEffect(() => {
    addPosts(0, next);
  }, [posts, next]);

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
      <Posts
        component={Post}
        visiblePosts={visiblePosts}
        pageSize={pageSize}
        next={next}
        setNext={setNext}
      />
    </CssBaseline>
  );
};

export default Main;
