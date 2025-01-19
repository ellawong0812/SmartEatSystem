import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Navbar = () => {
  const navigate = useNavigate();

  const logOut = () => {
    navigate("/");
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <React.Fragment>
        <Button
          onClick={handleClickOpen}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Log Out
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Log Out"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure to log out?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={logOut} autoFocus>
              Yes
            </Button>
            <Button onClick={handleClose}>No</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
};

export default Navbar;
