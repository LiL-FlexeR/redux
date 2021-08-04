import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header/Header";
import Description from "../components/404/Description";
import { fetchCurrentUser } from "../store/authSlice";

const NotFound = () => {
  const dispatch = useDispatch();
  const { auth, currentUser } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, []);

  return (
    <div>
      <Header auth={auth} currentUser={currentUser} />
      <Description />
    </div>
  );
};

export default NotFound;
