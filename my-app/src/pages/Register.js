import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    onRegister({ email, password, gender });
  };

  const login = () => {
    navigate("/");
  };

  return (
    <div>
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
            label="Username"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between" // Optional: adds space between items
            alignItems="center" // Optional: vertically centers items
            sx={{ gap: 10 }} // Optional: adds space between the TextFields
          >
            <TextField
              select
              label="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              variant="outlined"
              margin="normal"
              sx={{ width: "150px", flex: 1 }} // Allows the TextField to grow and fill space
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>

            <TextField
              select
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              variant="outlined"
              margin="normal"
              sx={{ width: "150px", flex: 1 }} // Allows the TextField to grow and fill space
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>
          </Box>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleRegister}
          >
            Register
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            sx={{ mt: 2 }}
            onClick={login}
          >
            Back
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Register;
