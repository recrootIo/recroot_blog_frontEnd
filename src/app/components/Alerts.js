import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { SUCCESS, ERROR } from "./constants";
import PropTypes from "prop-types";
import * as React from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Alerts = ({ ...props }) => {
  const { type, open, handleClose } = props;
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        This is a success message!
      </Alert>
    </Snackbar>
  );
};

Alerts.defaultProps = {
  type: SUCCESS,
  open: false,
  handleClose: () => {},
  autoHide: 6000,
  message: "Success",
};
Alerts.propTypes = {
  type: PropTypes.oneOf([SUCCESS, ERROR]),
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  autoHide: PropTypes.number,
  message: PropTypes.string,
};
export default Alerts;
