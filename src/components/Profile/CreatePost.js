import { Button, TextField } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../store/postsSlice";

const CreatePost = () => {
  const [isCreate, setIsCreate] = React.useState(false);
  const initialState = {
    title: "",
    description: "",
    fullText: "",
  };
  const [postData, setPostData] = React.useState(initialState);
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const sendPostData = () => {
    dispatch(createPost(postData));
    setIsCreate(false);
  };

  return (
    <div style={{ marginBottom: "5rem" }}>
      {isCreate ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "15rem",
          }}
        >
          <TextField
            onChange={onChangeHandler}
            placeholder="Enter post title"
            name="title"
          />
          <TextField
            onChange={onChangeHandler}
            placeholder="Enter post description"
            name="description"
          />
          <TextField
            onChange={onChangeHandler}
            placeholder="Enter post full text"
            name="fullText"
          />
          <Button
            style={{ backgroundColor: "rgb(112, 201, 48)", color: "#fff" }}
            onClick={sendPostData}
          >
            Create Post
          </Button>
          <Button
            onClick={() => setIsCreate(false)}
            style={{ backgroundColor: "rgb(255, 28, 28)", color: "#fff" }}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => setIsCreate(true)}
          style={{ backgroundColor: "rgb(112, 201, 48)", color: "#fff" }}
        >
          Create Post
        </Button>
      )}
    </div>
  );
};

export default CreatePost;
