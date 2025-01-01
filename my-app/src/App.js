import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./components/theme";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FoodSearch from "./components/FoodSearch";

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
      <Login onLogin={handleLogin} onRegister={handleRegister} />
      <Register />
      <FoodSearch />
    </ThemeProvider>
  );
};

export default App;
