import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";

const API_URL = "http://localhost:3001";

const UserRecords = () => {
  const [records, setRecords] = useState([]);
  const [open, setOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({
    dish_id: "",
    datetime: "",
    remark: "",
    net_calories: "",
  });

  // Fetch user records on component mount
  const fetchRecords = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/ViewAllRecords`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecords(response.data);
    } catch (error) {
      alert("Error fetching records: " + error.message);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Handle new record submission
  const handleAddRecord = async () => {
    console.log("Submitting new record:", newRecord); // Debugging

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/AddRecord`, newRecord, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Record added successfully!");
      setOpen(false);
      fetchRecords(); // Refresh records after adding
      setNewRecord({
        dish_id: "",
        datetime: "",
        remark: "",
        net_calories: "",
      });
    } catch (error) {
      alert("Error adding record: " + error.message);
    }
  };

  return (
    <div>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Consumption Records
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => setOpen(true)}
          >
            Add Record
          </Button>
        </Toolbar>
      </AppBar>

      <Container>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
          Your Records
        </Typography>
        <Grid container spacing={3}>
          {records.map((record) => (
            <Grid item xs={12} sm={6} md={4} key={record.id}>
              <Card
                sx={{
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              >
                <CardContent>
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    Dish ID: {record.dish_id}
                  </Typography>
                  <Typography>Date: {record.datetime}</Typography>
                  <Typography>Remark: {record.remark}</Typography>
                  <Typography>Net Calories: {record.net_calories}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {records.length === 0 && (
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ textAlign: "center", mt: 4, width: "100%" }}
            >
              No records found. Add a new record to get started.
            </Typography>
          )}
        </Grid>
      </Container>

      {/* Add Record Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Consumption Record</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField
              label="Dish ID"
              variant="outlined"
              value={newRecord.dish_id}
              onChange={(e) =>
                setNewRecord({ ...newRecord, dish_id: e.target.value })
              }
            />
            <TextField
              label="Date and Time"
              type="datetime-local"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={newRecord.datetime}
              onChange={(e) =>
                setNewRecord({ ...newRecord, datetime: e.target.value })
              }
            />
            <TextField
              label="Remark"
              variant="outlined"
              value={newRecord.remark}
              onChange={(e) =>
                setNewRecord({ ...newRecord, remark: e.target.value })
              }
            />
            <TextField
              label="Net Calories"
              type="number"
              variant="outlined"
              value={newRecord.net_calories}
              onChange={(e) =>
                setNewRecord({ ...newRecord, net_calories: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddRecord} variant="contained">
            Add
          </Button>
          <Button onClick={() => setOpen(false)} color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserRecords;
