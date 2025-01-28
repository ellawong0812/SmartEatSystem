import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  Home,
  AddCircleOutline,
  BarChart,
  ListAlt,
  Logout,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const NavbarAdmin = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogOut = () => {
    setOpen(false);
    navigate("/");
  };

  return (
    <>
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          {/* App Title */}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              letterSpacing: 1,
              cursor: "pointer",
            }}
            onClick={() => handleNavigate("/home/admin")}
          >
            Admin Dashboard
          </Typography>

          {/* Navigation Buttons */}
          <Button
            startIcon={<Home />}
            color="inherit"
            onClick={() => handleNavigate("/home/admin")}
            sx={{
              marginRight: 2,
              "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
            }}
          >
            Home
          </Button>
          <Button
            startIcon={<AddCircleOutline />}
            color="inherit"
            onClick={() => handleNavigate("/dishForm")}
            sx={{
              marginRight: 2,
              "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
            }}
          >
            Add Dish
          </Button>
          <Button
            startIcon={<BarChart />}
            color="inherit"
            onClick={() => handleNavigate("/report")}
            sx={{
              marginRight: 2,
              "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
            }}
          >
            Reports
          </Button>
          <Button
            startIcon={<ListAlt />}
            color="inherit"
            onClick={() => handleNavigate("/allDishes")}
            sx={{
              marginRight: 2,
              "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
            }}
          >
            All Dishes
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

export default NavbarAdmin;
