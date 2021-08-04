import { Dialog } from "@material-ui/core";
import React from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const Modal = ({ openModal, setModalOpen, login }) => {
  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <Dialog open={openModal} onClose={handleClose}>
      {!login ? (
        <LoginForm setModalOpen={setModalOpen} />
      ) : (
        <SignUpForm setModalOpen={setModalOpen} />
      )}
    </Dialog>
  );
};

export default Modal;
