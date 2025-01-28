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
  CardMedia,
  CircularProgress,
} from "@mui/material";
import Navbar from "./Navbar";
import axios from "axios";

const FoodSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to handle searching
  const handleSearch = async () => {
    if (!query) {
      alert("Please enter a food name to search.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/dishes?name=${query}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching dish data:", error);
      alert("Failed to fetch dish information. Please try again.");
    }
    setLoading(false);
    setQuery("");
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 8, pb: 4 }}>
        {/* Search Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "#fff",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: "bold",
              color: "#0a66fa",
            }}
          >
            Find Out The Food Calories Here
          </Typography>
          <TextField
            fullWidth
            label="Enter Food Name"
            variant="outlined"
            margin="normal"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              padding: "10px 0",
              fontSize: "16px",
              fontWeight: "bold",
              backgroundColor: "#0a66fa",
            }}
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Search"
            )}
          </Button>
        </Box>

        {/* Results Section */}
        {results.length > 0 && (
          <Typography
            variant="h5"
            sx={{ mt: 4, mb: 2, textAlign: "center", fontWeight: "bold" }}
          >
            Results Found: {results.length}
          </Typography>
        )}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {results.map((dish) => (
            <Grid item xs={12} sm={6} md={4} key={dish.id}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "all 0.3s ease-in-out",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#3f51b5" }}
                  >
                    {dish.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Dish ID: {dish.id}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Restaurant: {dish.restaurant}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Protein: {dish.protein}g
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Fat: {dish.fat}g
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Ingredients: {dish.ingredient_list}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* No Results */}
        {results.length === 0 && !loading && (
          <Typography
            sx={{ mt: 4 }}
            color="textSecondary"
            align="center"
            variant="h6"
          >
            No dishes found. Try searching for another food.
          </Typography>
        )}
      </Container>
    </div>
  );
};

export default FoodSearch;
