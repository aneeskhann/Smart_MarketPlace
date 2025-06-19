import React from "react";
import { Snackbar } from "@mui/material";
import  {Alert}  from "@mui/material";

const SnackbarNotification = ({ open, message, onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <Alert onClose={onClose} severity="success">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;
