import * as React from "react";

import Button from "@mui/material/Button";
import List from "@mui/material/List";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import MenuItem from "@mui/material/MenuItem";

import * as Urls from "../../Routing/Urls";
import * as Requests from "../../Helpers/Requests";

export default function AddUser(props) {
  const { onClose, selectedValue, open } = props;
  const handleClose = () => {
    onClose(selectedValue);
    setAddUserFormValues({});
  };

  const [addUserFormValues, setAddUserFormValues] = React.useState({});

  const [errMessagesArr, setErrMessagesArr] = React.useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddUserFormValues({
      ...addUserFormValues,
      [name]: value,
    });
  };

  const handleAddUserSubmit = (e) => {
    e.preventDefault();

    let formData = JSON.parse(JSON.stringify(addUserFormValues));

    Requests.formRequest("users", "post", formData)
      .then(() => {
        window.location.replace(`${Urls.frontendUrl}/users`);
      })
      .catch((error) => {
        let errorsArr = error.response.data.error;
        setErrMessagesArr([errorsArr]);
      });
  };

  // Creating form fields functions.
  const createFormFields = (labelData, nameData, typeData, valueData) => {
    return {
      label: labelData,
      name: nameData,
      type: typeData,
      value: valueData,
    };
  };

  const fields = [
    createFormFields("Name", "name", "text", addUserFormValues.name),
    createFormFields("Email", "email", "email", addUserFormValues.email),
    createFormFields(
      "Password",
      "password",
      "password",
      addUserFormValues.password
    ),
  ];
  // Creating form fields functions.

  return (
    <Dialog onClose={handleClose} open={open}>
      <form onSubmit={handleAddUserSubmit}>
        <DialogTitle>Add User</DialogTitle>
        <List sx={{ pt: 0 }}>
          <DialogContent>
            {fields.map((field) => (
              <TextField
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                value={field.value}
                onChange={handleInputChange}
                fullWidth
                margin="dense"
                variant="standard"
              />
            ))}
          </DialogContent>
          {errMessagesArr &&
            errMessagesArr.map((errorMsg) => (
              <div className="alert alert-danger" role="alert">
                {errorMsg}
              </div>
            ))}
        </List>
        <DialogActions className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success me-3">
            Create User
          </button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
