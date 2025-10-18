import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const { userData } = useSelector((state) => state.user);
  return userData ? <Navigate to="/" replace/> : children;
}

export default PublicRoute;
