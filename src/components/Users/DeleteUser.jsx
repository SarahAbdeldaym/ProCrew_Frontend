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

export default function DeleteUser(props) {
  const { onClose, selectedValue, open, managedUserData } = props;
  const handleClose = () => {
    onClose(selectedValue);
  };

  let managedUserDataObj = {
    id: managedUserData.id,
    name: managedUserData.name,
    email: managedUserData.email,
  };

  const handleDeleteUserSubmit = (e) => {
    e.preventDefault();

    Requests.formRequest(`users/${managedUserDataObj.id}`, "delete")
      .then(() => {
        window.location.replace(`${Urls.frontendUrl}/users`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <form onSubmit={handleDeleteUserSubmit}>
        <DialogTitle>Delete User</DialogTitle>
        <List sx={{ pt: 0 }}>
          <DialogContent>
            <div>Are you sure you want to delete this user</div>
            <div className="text-center my-3">
              <b>{managedUserData.name}</b>
            </div>
            <div>This action cannot be undone.</div>
          </DialogContent>
        </List>
        <DialogActions className="d-flex justify-content-between">
          <button type="submit" className="btn btn-danger me-3">
            Confirm Delete
          </button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
