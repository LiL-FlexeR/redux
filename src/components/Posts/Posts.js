import React from "react";
import { Button, Grid } from "@material-ui/core";
import { useParams, useHistory } from "react-router";
import Post from "./Post";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../../store/postsSlice";

const Posts = ({ next, setNext, pageSize, visiblePosts }) => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (posts.posts.length < 1) {
      dispatch(fetchPosts());
    }
  }, []);

  const morePosts = () => {
    const newPageSize = next + pageSize;
    setNext(newPageSize);
  };

  return (
    <Grid>
      <Grid
        container
        style={{
          alignItems: "center",
          width: "90%",
          margin: "0 auto",
        }}
        spacing={3}
      >
        {visiblePosts?.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </Grid>
      {visiblePosts.length < pageSize ? null : (
        <Button onClick={morePosts}>Load More</Button>
      )}
    </Grid>
  );
};

export default Posts;
