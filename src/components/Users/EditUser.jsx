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

export default function EditUser(props) {
  const { onClose, selectedValue, open, managedUserData } = props;
  const handleClose = () => {
    onClose(selectedValue);
    setEditUserFormValues({});
  };
  const [editUserFormValues, setEditUserFormValues] = React.useState({
    name: managedUserData.name,
    email: managedUserData.email,
  });

  const [errMessagesArr, setErrMessagesArr] = React.useState("");
  
  let managedUserDataObj = {
    id: managedUserData.id,
    name: managedUserData.name,
    email: managedUserData.email,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUserFormValues({
      ...editUserFormValues,
      [name]: value,
    });
  };

  const handleEditUserSubmit = (e) => {
    e.preventDefault();

    let formData = JSON.parse(JSON.stringify(editUserFormValues));

    Requests.formRequest(`users/${managedUserDataObj.id}`, "put", formData)
      .then(() => {
        window.location.replace(`${Urls.frontendUrl}/users`);
      })
      .catch((error) => {
        let errorsObject = error.response.data.errors;
        let errorsArr = [];
        for (const errorKey in errorsObject) {
          errorsArr.push(errorsObject[errorKey][0]);
        }
        setErrMessagesArr([...errorsArr]);
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
    createFormFields("Name", "name", "text", managedUserDataObj.name),
    createFormFields("Email", "email", "email", managedUserDataObj.email),
  ];
  // Creating form fields functions.

  return (
    <Dialog onClose={handleClose} open={open}>
      <form onSubmit={handleEditUserSubmit}>
        <DialogTitle>Edit User</DialogTitle>
        <List sx={{ pt: 0 }}>
          <DialogContent>
            {fields.map((field) => (
              <TextField
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                defaultValue={field.value}
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
          <button type="submit" className="btn btn-warning me-3">
            Confirm Changes
          </button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
