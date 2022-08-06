import React from "react";
import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 flex-column">
      <h1>404 - Page not found</h1>
      <h3 className="my-4">The page you are trying to access is not found</h3>
      <NavLink className="btn btn-primary" to="/login">Back To Homepage</NavLink>
    </div>
  );
}
