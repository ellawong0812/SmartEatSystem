import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Container,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import axios from "axios";
import NavbarAdmin from "../components/NavbarAdmin";

const DishForm = () => {
  const API_URL = "http://localhost:3001";

  const [dishData, setDishData] = useState({
    name: "",
    restaurant: "",
    protein: "",
    fat: "",
    ingredient_list: "",
  });

  const addDish = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/AddDish`, dishData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Dish added successfully!");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div>
      <NavbarAdmin />

      <div style={{ paddingLeft: "50px" }}>
        <form onSubmit={addDish}>
          <TextField
            label="Dish Name"
            fullWidth
            margin="normal"
            value={dishData.name}
            onChange={(e) => setDishData({ ...dishData, name: e.target.value })}
          />
          <TextField
            label="Restaurant"
            fullWidth
            margin="normal"
            value={dishData.restaurant}
            onChange={(e) =>
              setDishData({ ...dishData, restaurant: e.target.value })
            }
          />
          <TextField
            label="Protein"
            fullWidth
            margin="normal"
            value={dishData.protein}
            onChange={(e) =>
              setDishData({ ...dishData, protein: e.target.value })
            }
          />
          <TextField
            label="Fat"
            fullWidth
            margin="normal"
            value={dishData.fat}
            onChange={(e) => setDishData({ ...dishData, fat: e.target.value })}
          />
          <TextField
            label="Ingredient List"
            fullWidth
            margin="normal"
            value={dishData.ingredient_list}
            onChange={(e) =>
              setDishData({ ...dishData, ingredient_list: e.target.value })
            }
          />
          <Button type="submit" variant="contained" fullWidth>
            Add Dish
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DishForm;
