import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  MenuItem,
} from "@mui/material";

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const handleRegister = () => {
    onRegister({ email, password, gender });
  };

  return (
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
          Register
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
        <TextField
          fullWidth
          select
          label="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          variant="outlined"
          margin="normal"
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </TextField>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleRegister}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
