import React from "react";
import { NavLink } from "react-router-dom";

export default function NotLoggedIn() {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 flex-column">
      <h1>You can't access this content without being logged in</h1>
      <h3 className="my-4">Please login first to proceed</h3>
      <NavLink className="btn btn-primary" to="/login">Go To Login</NavLink>
    </div>
  );
}
