import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import NavbarAdmin from "../components/NavbarAdmin";

// Register Chart.js components
ChartJS.register(
  BarElement,
  LineElement,
  PointElement, // Register PointElement for Line charts
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const AdminReport = () => {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/reports");
      setReportData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching report data:", error);
      alert("Failed to fetch report data.");
      setLoading(false);
    }
  };

  const calorieChartData = {
    labels: reportData?.calorieData.users || [],
    datasets: [
      {
        label: "Calories Consumed",
        data: reportData?.calorieData.netCalories || [],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderWidth: 1,
      },
    ],
  };

  const dishChartData = {
    labels: reportData?.dishData.dishes || [],
    datasets: [
      {
        label: "Dish Consumption Rate",
        data: reportData?.dishData.consumptionRate || [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <div>
      <NavbarAdmin />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Admin Reports
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {/* Calorie Report */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" align="center" gutterBottom>
                  User Calorie Consumption
                </Typography>
                <Bar data={calorieChartData} />
              </CardContent>
            </Card>
          </Grid>
          {/* Dish Consumption Report */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" align="center" gutterBottom>
                  Dish Consumption Rate
                </Typography>
                <Line data={dishChartData} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button variant="contained" color="primary" onClick={fetchReportData}>
            Refresh Reports
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default AdminReport;
