import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./components/theme";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FoodSearch from "./components/FoodSearch";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
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
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<FoodSearch />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
