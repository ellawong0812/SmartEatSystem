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
import Navbar from "./Navbar";
import AllDishes from "../pages/AllDishes";
import UserRecords from "../pages/UserRecords";

const FoodSearch = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    const data = await onSearch(query);
    setResults(data);
  };

  return (
    <div>
      <Navbar />
      <UserRecords />
      <hr />
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "#f9f9f9",
          }}
        >
          <Typography variant="h4" sx={{ mb: 4 }}>
            Search Food
          </Typography>
          <TextField
            fullWidth
            label="Enter Food Name"
            variant="outlined"
            margin="normal"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>

        <Grid container spacing={2} sx={{ mt: 4 }}>
          {results.map((result, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{result.name}</Typography>
                  <Typography>Calories: {result.calories}</Typography>
                  {result.available && (
                    <Typography color="green">Available at HKUST</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default FoodSearch;
