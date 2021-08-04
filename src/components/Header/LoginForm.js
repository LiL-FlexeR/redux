import {
  DialogContent,
  DialogTitle,
  DialogActions,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, fetchCurrentUser } from "../../store/authSlice";

const LoginForm = ({ setModalOpen }) => {
  const initialState = {
    email: "",
    password: "",
    emailValid: false,
    passwordValid: false,
    validForm: false,
  };

  const dispatch = useDispatch();

  const [formData, setFormData] = React.useState(initialState);

  const validateForm = () => {
    const email = formData.email;
    const password = formData.password;

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
  };

  const changeFormHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const sendDataHandler = async () => {
    validateForm();
    if (formData.emailValid && formData.passwordValid) {
      const postData = {
        email: formData.email,
        password: formData.password,
      };
      console.log(postData);
      await dispatch(fetchAuth(postData));
      dispatch(fetchCurrentUser());
      setModalOpen(false);
    }
  };

  return (
    <div>
      <DialogTitle disableTypography>
        <Typography variant="h5">Let`s Login</Typography>
      </DialogTitle>
      <DialogContent style={{ flexDirection: "column", display: "flex" }}>
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
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={sendDataHandler}>
          Send Data
        </Button>
      </DialogActions>
    </div>
  );
};

export default LoginForm;
