import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Requests from "../../Helpers/Requests";
import AlertMain from "../Alerts/AlertMain";

export default function ResetPassword() {
  const navigate = useNavigate();

  // Alerts state
  const [severity, setSeverity] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const handleAlertClose = () => setAlert(false);

  let [user, setUser] = useState({
    email: "",
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
    Requests.formRequest("check-email", "post", user)
      .then((response) => {
        setSeverity("success");
        setMessage("An email with password reset url has been sent.");
        setTimeout(() => (window.location.href = "/check-email"), 1000);
        setAlert(true);
      })
      .catch((error) => setErrMessage(error.response.data));
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
            Password Reset Confirmation
          </div>
          <form className="w-50" onSubmit={formSubmit}>
            <div className="mb-3 d-flex flex-column">
              <label htmlFor="email" className="form-label">
                Enter your email to reset password
              </label>
              <input
                onChange={getUser}
                type="email"
                className="form-control"
                name="email"
              ></input>
            </div>
            <button type="submit" className="btn btn-primary">
              Reset Password
            </button>
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
