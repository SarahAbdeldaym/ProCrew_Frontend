import React from "react";
import { Routes, Route  } from "react-router-dom";

import Home from "../components/Home";
import Login from "../components/Auth/Login";
import Profile from "../components/Users/Profile";
import NotFound from "../components/ErrorPages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import { Navigate } from "react-router-dom";
import ListUsers from "../components/Users/ListUsers";
import Register from "../components/Auth/Register";
import ResetPassword from "../components/Auth/ResetPassword";
import ConfirmPassword from "../components/Auth/ConfirmPassword";

export default function Routing() {
  return (
    <>
      <div style={{ paddingTop: "100px", minHeight: "100vh" }}>
        <Routes>
          <Route
            path=""
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="users" element={<ListUsers />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/confirm-password-change" element={<ConfirmPassword/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}
