import { Box, Button, TextField, Typography } from "@material-ui/core";
import React from "react";
import axios from "axios";

const UserData = ({ currentUser }) => {
  const [img, setImg] = React.useState(null);
  const token = localStorage.getItem("token");
  const [isUpdate, setUpdate] = React.useState(false);
  const [newName, setNewName] = React.useState("");

  const handleUploadClick = ({ target }) => {
    const fileReader = new FileReader();
    const name = target.accept.includes("image");
    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e) => {
      setImg(e.target.result);
    };
  };

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
    console.log(res.data);
    return res.data;
  };

  const dragStartHandler = (e) => {
    e.preventDefault();
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
  };

  const postImage = (id, formData) => {
    axios.put(
      `https://nodejs-test-api-blog.herokuapp.com/api/v1/users/upload/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const onDropHandler = (e) => {
    e.preventDefault();
    let files = [...e.dataTransfer.files];
    const formData = new FormData();
    formData.append("avatar", files[0]);
    postImage(currentUser._id, formData);
  };

  const uploadImg = () => {};

  return (
    <div style={{ width: "80%", margin: "0 auto", marginTop: "10rem" }}>
      {isUpdate ? (
        <Box>
          <TextField
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
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
            width: "30rem",
            height: "30rem",
            backgroundColor: "#c2c2c2",
          }}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDrop={(e) => onDropHandler(e)}
          onDragStart={(e) => dragStartHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
        ></Box>
        <Button onClick={uploadImg} style={{ width: "15em" }}>
          Upload
        </Button>
      </Box>
    </div>
  );
};

export default UserData;
