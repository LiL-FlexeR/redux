import React from "react";
import {
  Card,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { fetchPost, fetchPostImage, updatePost } from "../../store/postSlice";
import { deletePost, fetchPosts } from "../../store/postsSlice";
import { current } from "@reduxjs/toolkit";

const EditPost = ({ currentPost, isUpdate, setUpdate }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchPost(currentPost._id));
  }, [isUpdate]);

  const post = useSelector((state) => state.post.post);

  React.useEffect(() => {
    setEditedData(initialState);
  }, [post]);

  const initialState = {
    title: post.title || "",
    description: post.description || "",
    fullText: post.fullText || "",
  };

  const [editedData, setEditedData] = React.useState(initialState);

  const onChangeHandler = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const sendEditedData = async (post) => {
    const patchData = {
      postId: post._id,
      editedData: editedData,
    };
    await dispatch(updatePost(patchData));
    dispatch(fetchPosts());
    setUpdate(false);
    setEditedData(initialState);
  };

  const onDropHandler = async (e, postId) => {
    e.preventDefault();
    let postFile = [...e.dataTransfer.files];
    const formData = new FormData();
    formData.append("image", postFile[0]);
    const putData = {
      postId,
      image: formData,
    };
    console.log(postId, formData);
    await dispatch(fetchPostImage(putData));
    dispatch(fetchPosts());
  };

  const dragStartHandler = (e) => {
    e.preventDefault();
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
  };

  const closeModalHandler = () => {
    setUpdate(false);
  };

  return (
    <div>
      <Dialog open={isUpdate} onClose={closeModalHandler}>
        <DialogContent>
          <Box>
            <TextField
              placeholder="New title"
              name="title"
              value={editedData.title}
              onChange={onChangeHandler}
            />
            <TextField
              placeholder="New description"
              name="description"
              value={editedData.description}
              onChange={onChangeHandler}
            />
            <TextField
              placeholder="New full text"
              name="fullText"
              value={editedData.fullText}
              onChange={onChangeHandler}
            />
            <Box
              style={{
                width: "10rem",
                height: "10rem",
                backgroundColor: "#c2c2c2",
                display: "flex",
                alignItems: "center",
                marginTop: "2rem",
              }}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDrop={(e) => onDropHandler(e, currentPost._id)}
              onDragStart={(e) => dragStartHandler(e)}
              onDragOver={(e) => dragStartHandler(e)}
            >
              <img
                src={`https://nodejs-test-api-blog.herokuapp.com${post.image}`}
                alt=""
              />
            </Box>
            <Button
              onClick={() => sendEditedData(currentPost)}
              style={{
                marginTop: "2rem",
                backgroundColor: "rgb(249, 140, 30)",
                color: "#fff",
                width: "7.5rem",
              }}
            >
              Send Data
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditPost;
