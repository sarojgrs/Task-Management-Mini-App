import React from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

interface ToasterProps {
  open: boolean;
  message: string;
  severity: AlertColor; // "error" | "success" | "info" | "warning"
  onClose: () => void;
}

const Toaster: React.FC<ToasterProps> = ({
  open,
  message,
  severity,
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toaster;
