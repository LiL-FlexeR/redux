import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import img from "../../assets/images/error.png";
import Like from "../../assets/images/Like";

const Description = () => {
  const postState = useSelector((state) => state.post);
  const post = postState.post;
  const fill = 0;

  return (
    <Grid container>
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
        <img src={img} />
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
        <Typography style={{ display: "flex", alignItems: "center" }}>
          <Like fill={fill} />
          {post.likes?.length} Likes
        </Typography>
        <Typography>{post.dateCreated}</Typography>
      </Grid>
    </Grid>
  );
};

export default Description;
