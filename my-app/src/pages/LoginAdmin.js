import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { Box, Button, TextField, Typography, Container } from "@mui/material";

const LoginAdmin = () => {
  const API_URL = "http://localhost:3001";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = [email, password];
      const response = await axios.post(`${API_URL}/login`, formData);
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
      navigate("/home");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  return (
    <div>
      <AppProvider>
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
              Login (Admin)
            </Typography>
            <TextField
              fullWidth
              label="ITSC Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          </Box>
        </Container>
      </AppProvider>
    </div>
  );
};

export default LoginAdmin;
