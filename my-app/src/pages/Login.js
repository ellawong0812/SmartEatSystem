import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Modal,
  IconButton,
} from "@mui/material";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  Close,
  Login as LoginIcon,
  PersonAdd,
  AdminPanelSettings,
} from "@mui/icons-material";
import axios from "axios";

const providers = [
  { id: "github", name: "GitHub" },
  { id: "google", name: "Google" },
  { id: "facebook", name: "Facebook" },
  { id: "twitter", name: "Twitter" },
  { id: "linkedin", name: "LinkedIn" },
];

const Login = () => {
  const API_URL = "http://localhost:3001";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setForgotPasswordModalOpen] =
    useState(false);
  const [forgotPasswordData, setForgotPasswordData] = useState({
    username: "",
    email: "",
  });
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = { username, password };
      const response = await axios.post(`${API_URL}/login`, formData);
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
      navigate("/home");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleRegister = () => navigate("/register");
  const handleAdminLogin = () => navigate("/login/admin");

  // Handle Forgot Password request
  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/forgot-password`,
        forgotPasswordData
      );
      alert("Password reset link has been sent to your email!");
      setForgotPasswordModalOpen(false);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <AppProvider theme={theme}>
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
          sx={{ color: theme.palette.primary.main, fontWeight: "bold", mb: 1 }}
        >
          Smart Eat System
        </Typography>
        <Typography variant="h6" sx={{ color: "#555", mb: 4 }}>
          Start your healthy life today!
        </Typography>
        <Container
          maxWidth="sm"
          sx={{
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: 3,
            padding: 4,
          }}
        >
          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
              Login
            </Typography>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<LoginIcon />}
              sx={{
                mt: 2,
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Login
            </Button>
            <Button
              fullWidth
              variant="text"
              startIcon={<PersonAdd />}
              onClick={handleRegister}
            >
              Register
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={() => setForgotPasswordModalOpen(true)}
              sx={{ mt: 1 }}
            >
              Forgot Password?
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={() => setModalOpen(true)}
              sx={{
                mt: 1,
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: theme.palette.success.dark,
                },
              }}
            >
              Login with Other Methods
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              startIcon={<AdminPanelSettings />}
              onClick={handleAdminLogin}
              sx={{
                mt: 1,
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: theme.palette.secondary.dark,
                },
              }}
            >
              Login as Admin
            </Button>
          </Box>
        </Container>

        {/* Modal for Forgot Password */}
        <Modal
          open={isForgotPasswordModalOpen}
          onClose={() => setForgotPasswordModalOpen(false)}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: 24,
              width: "90%",
              maxWidth: 400,
              p: 4,
            }}
          >
            <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
              Forgot Password
            </Typography>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={forgotPasswordData.username}
              onChange={(e) =>
                setForgotPasswordData({
                  ...forgotPasswordData,
                  username: e.target.value,
                })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              value={forgotPasswordData.email}
              onChange={(e) =>
                setForgotPasswordData({
                  ...forgotPasswordData,
                  email: e.target.value,
                })
              }
              sx={{ mb: 2 }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleForgotPassword}
            >
              Submit
            </Button>
            <Button
              fullWidth
              variant="text"
              color="error"
              onClick={() => setForgotPasswordModalOpen(false)}
              sx={{ mt: 2 }}
            >
              Cancel
            </Button>
          </Box>
        </Modal>
      </Box>
    </AppProvider>
  );
};

export default Login;
