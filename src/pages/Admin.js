import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useDispatch, useSelector } from "react-redux";
import AdminLogin from "../components/Admin/AdminLogin";
import { fetchCurrentUser } from "../store/authSlice";
import Administrator from "../components/Admin/Admin";

const Admin = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { admin, auth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, []);

  return (
    <CssBaseline>
      {!admin && !auth ? <AdminLogin /> : <Administrator />}
    </CssBaseline>
  );
};

export default Admin;
