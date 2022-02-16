import React from "react";
import { useLocation, Navigate } from "react-router-dom";

function Logout() {
  const location = useLocation();
  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default Logout;
