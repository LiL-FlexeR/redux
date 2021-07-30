import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reset } from "../../store/authSlice";

const Header = ({ open, setOpen, setLogin, setSignUp, auth, currentUser }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const LoginHandler = () => {
    setOpen(true);
    setLogin(true);
    setSignUp(false);
  };
  const SignUpHandler = () => {
    setOpen(true);
    setLogin(false);
    setSignUp(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(reset(false));
    history.push("/");
  };

  return (
    <AppBar>
      <Toolbar>
        <Typography style={{ flexGrow: 1 }} variant="h6">
          React/Redux App
        </Typography>
        {!auth ? (
          <Box>
            <Button color="inherit" onClick={LoginHandler}>
              Sign up
            </Button>
            <Button color="inherit" onClick={SignUpHandler}>
              Login In
            </Button>
          </Box>
        ) : (
          <Box
            style={{
              display: "flex",
              flexGrow: "0.1",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              style={{ display: "flex", alignItems: "center" }}
            >
              Hello! {currentUser.name}
            </Typography>
            <Link to={`/profile/${currentUser._id}`}>
              <Avatar />
            </Link>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => logoutHandler()}
            >
              Log Out
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
