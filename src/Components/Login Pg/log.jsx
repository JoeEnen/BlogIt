import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./log.css";
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Box,
  Link,
} from "@mui/material";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "sorry, wrong login credentials");
      }

      setToast({
        open: true,
        message: "Welcome back! Redirecting...",
        severity: "Hello,you are in.",
      });
      setTimeout(() => navigate("/blogs"), 2000);
    } catch (error) {
      setToast({ open: true, message: error.message, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", py: 7 }}>
      <Container maxWidth="md" className="yello">
        <Typography variant="h4" align="center" gutterBottom>
          Log in to your BlogIt Account
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            fullWidth
            label="Enter Username/Email"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            required
          />

          <TextField
            margin="normal"
            fullWidth
            type="password"
            label="Type your Password..."
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Box mt={3} display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Sign In"}
            </Button>
          </Box>

          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Opps, Don't have an account? Create one {" "}
              <Link href="/signup" underline="none" color="primary">
                Here
              </Link>
            </Typography>
          </Box>
        </form>

        <Snackbar
          open={toast.open}
          autoHideDuration={4000}
          onClose={() => setToast({ ...toast, open: false })}
        >
          <Alert severity={toast.severity}>{toast.message}</Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default LoginPage;
