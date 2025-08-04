import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import { Container, TextField, Button, Typography, Box, Alert, Paper } from "@mui/material";

// Warehouse/Earth-themed background image
const backgroundUrl = "https://spherewms.com/wp-content/uploads/2024/01/SPH-Whse-Inv-Mgmt-Blog-shutterstock_1930996376-1.webp";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axios.post("/auth/login", { email, password });
      localStorage.setItem("jwt", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3, minWidth: 350, maxWidth: 400, bgcolor: "rgba(255,255,255,0.92)" }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, color: "#1976d2" }}>
          Inventory Application
        </Typography>
        <Typography variant="h6" align="center" gutterBottom sx={{ mb: 3, color: "#333" }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Email" type="email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} required />
          <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} required />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, fontWeight: 600 }}>Login</Button>
        </form>
      </Paper>
    </Box>
  );
}