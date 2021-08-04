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
import { useDispatch, useSelector } from "react-redux";
import { reset, resetUser } from "../../store/authSlice";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const Header = ({
  setModalOpen,
  setLogin,
  setSignUp,
  auth,
  currentUser,
  loginError,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const postError = useSelector((state) => state.post.error);
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    setOpen(true);
  }, [, postError]);

  const LoginHandler = () => {
    setModalOpen(true);
    dispatch(reset());
    setLogin(true);
    setSignUp(false);
  };
  const SignUpHandler = () => {
    setModalOpen(true);
    dispatch(reset());
    setLogin(false);
    setSignUp(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(resetUser(false));
    history.push("/");
  };

  return (
    <AppBar>
      {postError.isError ? (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {postError.message}
          </Alert>
        </Snackbar>
      ) : (
        <Toolbar>
          <Link
            to="/"
            style={{ textDecoration: "none", color: "#fff", flexGrow: 1 }}
          >
            <Typography variant="h6">React/Redux App</Typography>
          </Link>
          {auth && token ? (
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
                <Avatar
                  src={`https://nodejs-test-api-blog.herokuapp.com${currentUser.avatar}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/1000x500`;
                  }}
                />
              </Link>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => logoutHandler()}
              >
                Log Out
              </Button>
            </Box>
          ) : (
            <Box>
              <Button color="inherit" onClick={LoginHandler}>
                Sign up
              </Button>
              <Button color="inherit" onClick={SignUpHandler}>
                Login In
              </Button>
            </Box>
          )}
        </Toolbar>
      )}
    </AppBar>
  );
};

export default Header;
