import { Box, Button, TextField, Typography } from "@material-ui/core";
import React from "react";
import axios from "axios";
import {
  deleteUser,
  fetchCurrentUser,
  reset,
  resetUser,
} from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const UserData = ({ currentUser, errorAuth }) => {
  const token = localStorage.getItem("token");
  const [isUpdate, setUpdate] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const state = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const history = useHistory();

  const changeNameHandler = async () => {
    const res = await axios.patch(
      `https://nodejs-test-api-blog.herokuapp.com/api/v1/users/${currentUser._id}`,
      {
        name: newName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(fetchCurrentUser());
    setUpdate(false);
    return res.data;
  };

  const dragStartHandler = (e) => {
    e.preventDefault();
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
  };

  const postImage = async (id, formData) => {
    const res = await axios.put(
      `https://nodejs-test-api-blog.herokuapp.com/api/v1/users/upload/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(fetchCurrentUser());
  };

  const onDropHandler = (e) => {
    e.preventDefault();
    let postFile = [...e.dataTransfer.files];
    const formData = new FormData();
    formData.append("avatar", postFile[0]);
    postImage(currentUser._id, formData);
  };

  const redirectToMain = () => {
    if (errorAuth.isError === null) {
      return;
    }
    if (!errorAuth.isError) {
      console.log(errorAuth);
      resetUser();
      history.push("/");
    }
  };

  const deleteUserHandler = async () => {
    await dispatch(deleteUser(currentUser._id));
    redirectToMain();
  };

  return (
    <div style={{ width: "100%", margin: "0 auto", marginTop: "5rem" }}>
      <Typography variant="h2">User Settings</Typography>
      {isUpdate ? (
        <Box>
          <TextField
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            error={newName.length < 2}
          />
          <Button onClick={changeNameHandler}>Change</Button>
        </Box>
      ) : (
        <Typography onClick={() => setUpdate(true)} variant="h5">
          {currentUser.name}
        </Typography>
      )}
      <Box style={{ marginTop: "2.5rem" }}>
        <Box
          style={{
            width: "15rem",
            height: "15rem",
            backgroundColor: "#c2c2c2",
            display: "flex",
            alignItems: "center",
          }}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDrop={(e) => onDropHandler(e)}
          onDragStart={(e) => dragStartHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
        >
          <img
            style={{
              width: "100%",
            }}
            src={`https://nodejs-test-api-blog.herokuapp.com/${currentUser.avatar}`}
            alt=""
          />
        </Box>
      </Box>
      <Button
        color="secondary"
        variant="contained"
        style={{
          marginTop: "2rem",
        }}
        onClick={() => deleteUserHandler()}
      >
        Delete User
      </Button>
    </div>
  );
};

export default UserData;
