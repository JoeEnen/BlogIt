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
} from "@mui/material";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import apiUrl from "../../Util/apiUrl";

import Navbar from "../LandingPage/navbar" ; 
import "./Signup.css";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const signupMutation = useMutation({
    mutationFn: async (newUser) => {
      const response = await axios.post(`${apiUrl}/api/signup`, newUser);
      return response.data;
    },
    onSuccess: () => {
      setToast({ open: true, message: "Signup successful!", severity: "success" });
      setTimeout(() => navigate("/login"), 2000);
    },
    onError: (error) => {
      const errorMsg = axios.isAxiosError(error)
        ? error?.response?.data?.message
        : "Something went wrong";
      setToast({ open: true, message: errorMsg, severity: "error" });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const { confirmPassword, ...userData } = formData;
    signupMutation.mutate(userData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <> 
      <Navbar activePage="signup" />

      <div className="yeah">
        <Container className="yoo" maxWidth="md">
          <Typography className="topa" variant="h4" align="center" gutterBottom>
            Start your journey with us. Connect with people of your caliber.
          </Typography>

          <form onSubmit={handleSubmit} noValidate>
            {["firstName", "lastName", "email", "username", "password", "confirmPassword"].map((field) => (
              <TextField
                key={field}
                margin="normal"
                fullWidth
                type={field.includes("password") ? "password" : "text"}
                label={field.replace(/([A-Z])/g, " $1")}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                error={!!errors[field]}
                helperText={errors[field]}
              />
            ))}

            <Box mt={2} display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={signupMutation.isPending}
              >
                {signupMutation.isPending ? <CircularProgress size={24} /> : "Create Account"}
              </Button>
            </Box>
          </form>

          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Already have an account?{" "}
              <a href="/login" style={{ color: "#1976d2", textDecoration: "none" }}>
                Login
              </a>
            </Typography>
          </Box>

          <Snackbar
            open={toast.open}
            autoHideDuration={4000}
            onClose={() => setToast({ ...toast, open: false })}
          >
            <Alert severity={toast.severity}>{toast.message}</Alert>
          </Snackbar>
        </Container>
      </div>
    </>
  );
};

export default SignUpPage;
