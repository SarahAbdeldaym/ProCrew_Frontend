import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import * as Requests from "../../Helpers/Requests";
import { NavLink } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  let [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      return navigate("/users");
    }
  }, []);

  function getUser(e) {
    let userCopy = { ...user };
    userCopy[e.target.name] = e.target.value;
    setUser(userCopy);
  }

  async function formSubmit(e) {
    e.preventDefault();
    Requests.formRequest("login", "post", user)
      .then((response) => {
        if (response.data) {
          let userData = response.data;
          userData.token = response.data.token;
          userData.email=user.email
      
          localStorage.setItem("userData", JSON.stringify(userData));
        }
      })
      .then(() => (window.location.href = "/users"))
      .catch((error) => setErrMessage(error.response.data));
  }

  return (
    <div style={{ height: "80vh" }}>
      <div className="container d-flex justify-content-center align-items-center h-100 flex-column">
        <div className="d-flex justify-content-center text-white h1 mb-5">
          ProCrew Task Login
        </div>
        <form className="w-50" onSubmit={formSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Your Email
            </label>
            <input
              onChange={getUser}
              type="email"
              className="form-control"
              name="email"
            ></input>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Your Password
            </label>
            <input
              onChange={getUser}
              type="password"
              className="form-control"
              name="password"
            ></input>
          </div>
          <div className="d-flex d-flex justify-content-end">
            <div className="d-flex align-items-center mx-3">
              Forget Password? 
			  <NavLink to="/reset-password" className="ms-2">Click here</NavLink>
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          {errMessage && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {errMessage}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
