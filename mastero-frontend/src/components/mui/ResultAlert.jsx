import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import { PropTypes } from "prop-types";

export default function ResultAlert(props) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    props.setOpenAlert(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Box sx={{ position: "absolute", bottom: "0" }}>
      <Snackbar
        open={props.open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={props.result}
        action={action}
      />
    </Box>
  );
}

ResultAlert.propTypes = {
  result: PropTypes.string,
  open: PropTypes.bool,
  setOpenAlert: PropTypes.any,
};
