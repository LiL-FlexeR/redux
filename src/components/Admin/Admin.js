import React from "react";
import Header from "../Header/Header";
import { useSelector } from "react-redux";
import AdminTool from "./AdminTool";

const Administrator = () => {
  const { admin, auth, currentUser } = useSelector((state) => state.auth);

  return (
    <div>
      <Header auth={auth} currentUser={currentUser} />
      <AdminTool />
    </div>
  );
};

export default Administrator;
