import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Requests from "../../Helpers/Requests";
import AlertMain from "../Alerts/AlertMain";

export default function Register() {
  const navigate = useNavigate();

  // Alerts state
  const [severity, setSeverity] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const handleAlertClose = () => setAlert(false);

  let [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
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
    Requests.formRequest("register", "post", user)
      .then(() => {
        setSeverity("success");
        setMessage("User Created Successfully.");
        setAlert(true);
        setTimeout(() => window.location.href = "/login", 1000);
      })
      .catch((error) => {
        setErrMessage(error.response.data);
      });
  }

  return (
    <>
      <AlertMain
        alert={alert}
        severity={severity}
        message={message}
        handleAlertClose={handleAlertClose}
      />
      <div style={{ height: "80vh" }}>
        <div className="container d-flex justify-content-center align-items-center h-100 flex-column">
          <div className="d-flex justify-content-center text-white h1 mb-5">
            ProCrew Task Register
          </div>
          <form className="w-50" onSubmit={formSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Your Name
              </label>
              <input
                onChange={getUser}
                type="text"
                className="form-control"
                name="name"
              ></input>
            </div>

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

            <div className="mb-3">
              <label htmlFor="password_confirmation" className="form-label">
                Confirm Your Password
              </label>
              <input
                onChange={getUser}
                type="password"
                className="form-control"
                name="password_confirmation"
              ></input>
            </div>

            <div className="d-flex d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Register
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
    </>
  );
}
