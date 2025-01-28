import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { Box, Button, TextField, Typography, Container } from "@mui/material";

const LoginAdmin = () => {
  const API_URL = "http://localhost:3001";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = { username, password }; // Send as JSON object
      const response = await axios.post(`${API_URL}/login/admin`, formData, {
        headers: { "Content-Type": "application/json" }, // Proper headers
      });
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
      navigate("/home/admin");
    } catch (error) {
      alert("Error: " + error.response?.data || error.message);
    }
  };
  return (
    <div>
      <AppProvider>
        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "#0a66fa",
              fontWeight: "bold",
              mb: 1,
            }}
          >
            Smart Eat System (Admin Panel)
          </Typography>

          <Container maxWidth="sm" sx={{ mt: 8 }}>
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
                Login
              </Typography>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleLogin}
              >
                Login
              </Button>
              <Button
                fullWidth
                variant="text"
                sx={{ mt: 2 }}
                onClick={() => {
                  navigate("/");
                }}
              >
                Back
              </Button>
            </Box>
          </Container>
        </Box>
      </AppProvider>
    </div>
  );
};

export default LoginAdmin;
