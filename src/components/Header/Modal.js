import { Dialog } from "@material-ui/core";
import React from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const Modal = ({ open, setOpen, login, signUp }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      {!login ? <LoginForm /> : <SignUpForm />}
    </Dialog>
  );
};

export default Modal;
