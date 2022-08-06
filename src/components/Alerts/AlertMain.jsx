import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertMain(props) {
  return (
    <>
      <Snackbar
        className="mt-5 me-3"
        open={props.alert}
        autoHideDuration={4000}
        onClose={props.handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={props.severity} sx={{ width: "100%" }}>
          {props.message}
        </Alert>
      </Snackbar>
    </>
  );
}
