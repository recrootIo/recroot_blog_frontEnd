import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { SUCCESS } from "./constants";
import * as React from "react";
import { closeModal } from "../store/messagesSlice";
import { useDispatch, useSelector } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Alerts = () => {
  const dispatch = useDispatch();
  const {
    open,
    message,
    type = SUCCESS,
  } = useSelector((state) => state.message);

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => dispatch(closeModal())}
    >
      <Alert
        onClose={() => dispatch(closeModal())}
        severity={type}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Alerts;
