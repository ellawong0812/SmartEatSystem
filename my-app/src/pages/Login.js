import React, { useState } from "react";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const providers = [
  { id: "github", name: "GitHub" },
  { id: "google", name: "Google" },
  { id: "facebook", name: "Facebook" },
  { id: "twitter", name: "Twitter" },
  { id: "linkedin", name: "LinkedIn" },
];

// const signIn = async (provider) => {
//   // Simulating an asynchronous sign-in process
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(`Sign in with ${provider.id}`);
//       resolve({ error: "This is a fake error" }); // Simulated error response
//     }, 500);
//   });
// };

const Login = () => {
  const API_URL = "http://localhost:3001";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  const signIn = () => {
    navigate("/home");
  };

  const theme = useTheme();

  const register = () => {
    navigate("/register");
  };

  const otherMethod = () => {
    return <SignInPage signIn={signIn} providers={providers} />;
  };

  const handleSubmit = async (e) => {
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

  const Modal = ({ onClose, providers }) => {
    return (
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          padding: 4,
          boxShadow: 3,
          zIndex: 1000,
        }}
      >
        <Button onClick={onClose} variant="contained" sx={{ mt: 10, ml: 3 }}>
          Close
        </Button>
        <SignInPage signIn={signIn} providers={providers} />
      </Box>
    );
  };

  return (
    <AppProvider theme={theme}>
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
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Button fullWidth variant="text" sx={{ mt: 1 }} onClick={register}>
            Register
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 1 }}
            onClick={() => setModalOpen(true)} // Open modal on click
          >
            Login With Other Methods
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => {
              navigate("/login/admin");
            }}
          >
            Login As Admin
          </Button>
        </Box>

        {/* Render Modal if isModalOpen is true */}
        {isModalOpen && (
          <Modal providers={providers} onClose={() => setModalOpen(false)} />
        )}
      </Container>
    </AppProvider>
  );
};

export default Login;
