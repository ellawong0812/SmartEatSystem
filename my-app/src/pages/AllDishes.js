import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Container,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import NavbarAdmin from "../components/NavbarAdmin";

const API_URL = "http://localhost:3001";

const AllDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDishes, setFilteredDishes] = useState([]);

  // Fetch dishes from the server
  const fetchDishes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/allDishes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDishes(response.data);
      setFilteredDishes(response.data); // Initially, show all dishes
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  // Handle search bar input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = dishes.filter((dish) =>
      dish.name.toLowerCase().includes(query)
    );
    setFilteredDishes(filtered);
  };

  // Fetch dishes on component mount
  useEffect(() => {
    fetchDishes();
  }, []);

  return (
    <div>
      <NavbarAdmin />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4" component="div" fontWeight="bold">
            All Dishes
          </Typography>
          <TextField
            label="Search Dishes"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ width: "300px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Grid container spacing={3}>
          {filteredDishes.map((dish) => (
            <Grid item xs={12} sm={6} md={4} key={dish.id}>
              <Card
                sx={{
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    {dish.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Restaurant: {dish.restaurant}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Protein: {dish.protein}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Fat: {dish.fat}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Ingredients: {dish.ingredient_list}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {filteredDishes.length === 0 && (
            <Grid item xs={12}>
              <Typography
                variant="h6"
                color="textSecondary"
                textAlign="center"
                sx={{ mt: 4 }}
              >
                No dishes found.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default AllDishes;
