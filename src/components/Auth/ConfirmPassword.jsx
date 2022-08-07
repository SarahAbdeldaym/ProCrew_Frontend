import React from "react";
import AlertMain from "../Alerts/AlertMain";
import * as Requests from "../../Helpers/Requests";

export default function Profile() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");


  // Alerts state
  const [severity, setSeverity] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const handleAlertClose = () => setAlert(false);

  // let userData = JSON.parse(localStorage.getItem("userData"));
  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = {};

	formData.email = email;
    formData.password = password;
    Requests.formRequest("confirm-password-change", "post", formData)
      .then(() => {
        setSeverity("success");
        setMessage("Password Updated Successfully.");
		setTimeout(() => window.location.href = "/profile", 1000);
      })
      .catch((err) => {
        setSeverity("error");
        setMessage(err.response.data.message);
      });
    setAlert(true);
  };
  return (
    <>
    <AlertMain
      alert={alert}
      severity={severity}
      message={message}
      handleAlertClose={handleAlertClose}
    />
      <div className="container">
        <div className="card bg-dark">
          <div className="card-header">
            <h5 className="card-title mb-0">
              <i className="fa fa-user-edit"></i> Update Password
            </h5>
          </div>
          <div className="card-body">
            <form className="form-signin">
              <div className="row mb-4">
                <div className="form-group col-lg-4 col-md-6">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    autoComplete="on"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group col-lg-4 col-md-6">
                  <label>New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    autoComplete="on"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
              </div>
              <div className="d-flex justify-content-center">
                <input
                  type="submit"
                  value="Update Password"
                  className="btn btn-warning w-25 my-3"
                  onClick={(e) => handleSubmit(e)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
