import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);

  if (token) {
    // If logged in, redirect to dashboard
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthRoute;
