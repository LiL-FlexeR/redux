import {
  Card,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
} from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostImage, updatePost } from "../../store/postSlice";
import { deletePost, fetchPosts } from "../../store/postsSlice";
import EditPost from "./EditPost";

const UserPosts = ({ currentUser }) => {
  const posts = useSelector((state) =>
    state.posts.posts.filter((post) => post.postedBy == currentUser._id)
  );

  const [isUpdate, setUpdate] = React.useState(false);

  const [currentPost, setCurrentPost] = React.useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const deletePostHandler = (id) => {
    dispatch(deletePost(id));
  };

  const openModalHandler = (post) => {
    setUpdate(true);
    setCurrentPost(post);
  };

  return (
    <Grid container spacing={2} style={{ marginTop: "5rem" }}>
      {posts.map((post) => (
        <Grid key={post._id} xs={4} item>
          <Card
            style={{
              height: "100%",
              padding: "4%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5">{post.title}</Typography>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="body1">{post.description}</Typography>
              <EditPost
                isUpdate={isUpdate}
                setUpdate={setUpdate}
                currentPost={currentPost}
              />
              <Button
                style={{
                  marginTop: "2rem",
                  backgroundColor: "rgb(199, 140, 30)",
                  color: "#fff",
                  width: "5rem",
                }}
                onClick={() => openModalHandler(post)}
              >
                Edit
              </Button>
              <Button
                color="secondary"
                variant="contained"
                style={{
                  marginTop: "2rem",
                  width: "10rem",
                }}
                onClick={() => deletePostHandler(post._id)}
              >
                Delete Post
              </Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserPosts;
