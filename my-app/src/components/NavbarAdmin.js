import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import ListAltIcon from "@mui/icons-material/ListAlt";

const NavbarAdmin = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logOut = () => {
    setOpen(false);
    navigate("/");
  };

  const dishForm = () => {
    navigate("/dishForm");
  };

  const generateReport = () => {
    navigate("/report");
  };

  const viewAllDishes = () => {
    navigate("/allDishes");
  };

  const home = () => {
    navigate("/home/admin");
  };

  return (
    <div>
      {/* Top Navigation Bar */}
      <AppBar position="static" color="primary" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleClickOpen}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content Section */}
      <Grid
        container
        spacing={1} // Reduced spacing for a smaller grid
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <Grid item xs={12} sm={6} md={4}>
          {" "}
          {/* Adjusted sizes for smaller cards */}
          <Card
            sx={{
              boxShadow: 3,
              transition: "0.3s",
              "&:hover": {
                boxShadow: 6,
                transform: "scale(1.05)",
              },
            }}
            onClick={home}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <HomeIcon fontSize="large" color="primary" />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Home
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              boxShadow: 3,
              transition: "0.3s",
              "&:hover": {
                boxShadow: 6,
                transform: "scale(1.05)",
              },
            }}
            onClick={dishForm}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <AddCircleOutlineIcon fontSize="large" color="primary" />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Add New Dish
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              boxShadow: 3,
              transition: "0.3s",
              "&:hover": {
                boxShadow: 6,
                transform: "scale(1.05)",
              },
            }}
            onClick={generateReport}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <BarChartIcon fontSize="large" color="primary" />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Generate Reports
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              boxShadow: 3,
              transition: "0.3s",
              "&:hover": {
                boxShadow: 6,
                transform: "scale(1.05)",
              },
            }}
            onClick={viewAllDishes}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <ListAltIcon fontSize="large" color="primary" />
              <Typography variant="h6" sx={{ mt: 2 }}>
                View All Dishes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Log Out</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={logOut} variant="contained" color="error">
            Yes
          </Button>
          <Button onClick={handleClose} variant="outlined">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NavbarAdmin;
