import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./components/theme";
import Login from "./pages/Login";
import LoginAdmin from "./pages/LoginAdmin";
import HomePageAdmin from "./pages/HomePageAdmin";
import Register from "./pages/Register";
import FoodSearch from "./components/FoodSearch";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DishForm from "./pages/DishForm";
import Report from "./pages/AdminReport";
import AllDishes from "./pages/AllDishes";
import UserRecords from "./pages/UserRecords";

const App = () => {
  const API_URL = "http://localhost:3001";
  const handleLogin = (email, password) => {
    console.log("Logging in:", email, password);
  };

  const handleRegister = () => {
    console.log("Navigating to Register");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login/admin" element={<LoginAdmin />} />
          <Route path="/home/record" element={<UserRecords />} />
          <Route path="/home/admin" element={<HomePageAdmin />} />
          <Route path="/dishForm" element={<DishForm />} />
          <Route path="/report" element={<Report />} />
          <Route path="/allDishes" element={<AllDishes />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<FoodSearch />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
