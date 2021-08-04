import { Grid, Typography, Box } from "@material-ui/core";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import img from "../../assets/images/error.png";
import Like from "../../assets/images/Like";
import { likePost } from "../../store/postSlice";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const Description = () => {
  const [open, setOpen] = React.useState(false);
  const postState = useSelector((state) => state.post);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const likes = useSelector((state) => state.post.post.likes);
  const post = postState.post;
  const postError = useSelector((state) => state.post.error);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setOpen(true);
  }, [postError]);

  const setLikeHandler = async (postId, userId) => {
    await dispatch(likePost({ postId, post, userId }));
  };

  return (
    <Grid container>
      {postError.isError ? (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {postError.message}
          </Alert>
        </Snackbar>
      ) : (
        <Grid>
          <Grid item xs={12}>
            <Typography
              variant="h2"
              style={{
                marginTop: "10rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {post.title}
            </Typography>
          </Grid>
          <Grid
            container
            style={{
              marginTop: "2.5rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={`https://nodejs-test-api-blog.herokuapp.com${post.image}`}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              style={{
                marginTop: "10rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {post.description}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              style={{
                marginTop: "10rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {post.fullText}
            </Typography>
          </Grid>
          <Grid
            container
            justifyContent="space-between"
            style={{ width: "80%", margin: "0 auto" }}
          >
            <Box
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => setLikeHandler(post._id, currentUser._id)}
            >
              <Like
                likes={likes}
                postError={postError}
                currentUser={currentUser}
                post={post}
              />
              {post.likes?.length} Likes
            </Box>
            <Typography>{post.dateCreated}</Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Description;
