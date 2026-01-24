import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { userData } = useSelector((state) => state.user);
  return userData ? children : <Navigate to="/" replace/>;
}

export default ProtectedRoute;
