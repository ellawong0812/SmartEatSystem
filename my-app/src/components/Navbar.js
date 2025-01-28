import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";
import { Home, ListAlt, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);

  const handleLogOut = () => {
    setOpen(false);
    navigate("/");
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          {/* Logo or App Title */}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              cursor: "pointer",
              fontWeight: "bold",
              letterSpacing: 1,
            }}
            onClick={() => handleNavigate("/home")}
          >
            Smart Eat System
          </Typography>

          {/* Navigation Buttons */}
          <Button
            startIcon={<Home />}
            color="inherit"
            onClick={() => handleNavigate("/home")}
            sx={{
              marginRight: 2,
              "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
            }}
          >
            Home
          </Button>
          <Button
            startIcon={<ListAlt />}
            color="inherit"
            onClick={() => handleNavigate("/home/record")}
            sx={{
              marginRight: 2,
              "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
            }}
          >
            Record
          </Button>
          <Button
            startIcon={<Logout />}
            color="inherit"
            onClick={handleDialogOpen}
            sx={{
              "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
            }}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title" sx={{ fontWeight: "bold" }}>
          Log Out
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleLogOut}
            variant="contained"
            color="error"
            sx={{ textTransform: "capitalize" }}
          >
            Yes
          </Button>
          <Button
            onClick={handleDialogClose}
            variant="outlined"
            sx={{ textTransform: "capitalize" }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;
