import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import apiUrl from "../../Util/apiUrl";
import "./log.css";

const LoginPage = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [toast, setToast] = useState({ open: false, message: "", severity: "info" });

  const loginMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`${apiUrl}/api/login`, formData, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setUser(data.user);

      setToast({ open: true, message: "Welcome back!", severity: "success" });
      setTimeout(() => navigate("/blogs"), 1500);
    },
    onError: (error) => {
      const errorMsg = axios.isAxiosError(error)
        ? error?.response?.data?.message
        : "Something went wrong";
      setToast({ open: true, message: errorMsg, severity: "error" });
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate();
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
            label="Password"
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
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? <CircularProgress size={24} /> : "Sign In"}
            </Button>
          </Box>

          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link href="/signup" underline="none" color="primary">
                Create one
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
