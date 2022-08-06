import * as React from "react";

import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";

export default function ManageUser(props) {
  const { onClose, selectedValue, open, managedUserData } = props;
  const handleClose = () => {
    onClose(selectedValue);
  };

  let managedUserDataObj = {
    id: managedUserData.id,
    name: managedUserData.name,
    email: managedUserData.email,
  };

  // Edit User dialog //
  const [openEditUserDialog, setOpenEditUserDialog] = React.useState(false);
  const handleEditUserOpen = () => setOpenEditUserDialog(true);
  const handleEditUserClose = () => setOpenEditUserDialog(false);
  // Edit User dialog //

  // delete User dialog //
  const [openDeleteUserDialog, setOpenDeleteUserDialog] = React.useState(false);
  const handleDeleteUserOpen = () => setOpenDeleteUserDialog(true);
  const handleDeleteUserClose = () => setOpenDeleteUserDialog(false);
  // delete User dialog //

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth={true}>
      <EditUser
        open={openEditUserDialog}
        onClose={handleEditUserClose}
        managedUserData={managedUserData}
      />
      <DeleteUser
        open={openDeleteUserDialog}
        onClose={handleDeleteUserClose}
        managedUserData={managedUserData}
      />
      <DialogTitle>User Data</DialogTitle>
      <List sx={{ pt: 0 }}>
        {Object.keys(managedUserDataObj).map((key, index) => {
          return (
            <ListItem key={index}>
              <ListItemText primary={`${key} : ${managedUserDataObj[key]}`} />
            </ListItem>
          );
        })}
      </List>
      <DialogActions className="d-flex justify-content-between">
        <div>
          <button
            className="btn btn-warning me-3"
            onClick={() => handleEditUserOpen()}
          >
            Edit User
          </button>
          <button
            className="btn btn-danger me-3"
            onClick={() => handleDeleteUserOpen()}
          >
            Delete User
          </button>
        </div>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
