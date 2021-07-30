import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Card, Grid, Typography } from "@material-ui/core";

const Post = ({ post }) => {
  return (
    <Grid item xs={3} style={{ marginTop: "15vh", height: "50vh" }}>
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
        <Box>
          <Typography variant="body1">{post.description}</Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem" }}
          >
            <Link
              to={`/post/${post._id}`}
              style={{ textDecoration: "none", color: "#fff" }}
            >
              Read More
            </Link>
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default Post;
