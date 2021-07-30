import React from "react";
import {
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
  DialogActions,
  Button,
  Snackbar,
} from "@material-ui/core";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SignUpForm = () => {
  const initialState = {
    email: "",
    password: "",
    name: "",
    emailValid: false,
    passwordValid: false,
    nameValid: false,
  };

  const [formData, setFormData] = React.useState(initialState);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
    setError(false);
  };

  const successSign = () => {
    setSuccess(true);
  };

  const errorSign = () => {
    setError(true);
  };

  const validateForm = () => {
    const email = formData.email;
    const password = formData.password;
    const name = formData.name;

    if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      formData.emailValid = false;
    } else {
      formData.emailValid = true;
    }

    if (password && password.length > 5) {
      formData.passwordValid = true;
    } else {
      formData.passwordValid = false;
    }

    if (name && name.length < 2) {
      formData.nameValid = false;
    } else {
      formData.nameValid = true;
    }
  };

  const changeFormHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const sendDataHandler = async () => {
    validateForm();
    if (formData.emailValid && formData.passwordValid && formData.nameValid) {
      const postData = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
      };
      try {
        const res = await axios.post(
          "https://nodejs-test-api-blog.herokuapp.com/api/v1/users",
          postData
        );
        successSign();
      } catch (error) {
        errorSign();
      }
    }
  };

  return (
    <div>
      <DialogTitle disableTypography>
        <Typography variant="h5">Let`s Sign Up</Typography>
      </DialogTitle>
      <DialogContent style={{ flexDirection: "column", display: "flex" }}>
        <TextField
          value={formData.name}
          onChange={changeFormHandler}
          name="name"
          error={formData.name.length < 2}
          label="Name"
        />
        <TextField
          value={formData.email}
          onChange={changeFormHandler}
          name="email"
          error={
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
          }
          label="Email"
        />
        <TextField
          value={formData.password}
          onChange={changeFormHandler}
          name="password"
          label="Password"
          error={formData.password.length < 6}
          helperText="Type at least 6 symbols"
          style={{ width: "20vw" }}
          type="password"
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={sendDataHandler}>
          Send Data
        </Button>
      </DialogActions>
      <Snackbar onClose={handleClose} open={success} autoHideDuration={6000}>
        <Alert onClose={handleClose} severity="success">
          You are successfully signed up!
        </Alert>
      </Snackbar>
      <Snackbar onClose={handleClose} open={error} autoHideDuration={6000}>
        <Alert onClose={handleClose} severity="error">
          Sign Error!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignUpForm;
