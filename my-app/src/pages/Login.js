import React, { useState } from "react";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";

const providers = [
  { id: "github", name: "GitHub" },
  { id: "google", name: "Google" },
  { id: "facebook", name: "Facebook" },
  { id: "twitter", name: "Twitter" },
  { id: "linkedin", name: "LinkedIn" },
];

const signIn = async (provider) => {
  // Simulating an asynchronous sign-in process
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Sign in with ${provider.id}`);
      resolve({ error: "This is a fake error" }); // Simulated error response
    }, 500);
  });
};

const Login = ({ onLogin, onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    onLogin(email, password);
  };

  const theme = useTheme();

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
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button fullWidth variant="text" sx={{ mt: 1 }} onClick={onRegister}>
            Register
          </Button>
        </Box>
        <SignInPage signIn={signIn} providers={providers} />
      </Container>
    </AppProvider>
  );
};

export default Login;
