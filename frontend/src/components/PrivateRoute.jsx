import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

const PrivateRoute = () => {
  const { user } = useSelector((state) => state?.auth);
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }

  return loggedIn && user ? (
    <Outlet />
  ) : !loggedIn && !user ? (
    <Navigate to="/login" />
  ) : null;
};

export default PrivateRoute;
