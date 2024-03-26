import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function SnackBar({ open, setOpen, isError, alertMsg }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <Alert
          onClose={handleClose}
          severity={isError ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}
