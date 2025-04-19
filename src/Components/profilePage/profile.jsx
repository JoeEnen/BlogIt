import React, { useEffect, useState } from "react";
import {
  Box, Container, TextField, Typography, Button, Divider, Snackbar, Alert
} from "@mui/material";
import axios from "axios";
import "./profile.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState({});
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put("http://localhost:5000/api/profile", profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setToast({ open: true, message: "Profile updated!", severity: "success" });
    } catch (err) {
      setToast({ open: true, message: err.response?.data?.message || "Error", severity: "error" });
    }
  };

  return (
    <Box className="profileBg">
      <Container maxWidth="md" className="profileCard">
        <Typography variant="h4" gutterBottom>My Profile</Typography>

        <TextField fullWidth margin="normal" name="phone" label="Phone Number"
          value={profile.phone || ""} onChange={handleChange} />
        <TextField fullWidth margin="normal" name="occupation" label="Occupation"
          value={profile.occupation || ""} onChange={handleChange} />
        <TextField fullWidth margin="normal" name="bio" label="Bio"
          value={profile.bio || ""} onChange={handleChange} />
        <TextField fullWidth margin="normal" name="status" label="Status Text"
          value={profile.status || ""} onChange={handleChange} />
        <TextField fullWidth margin="normal" name="secondaryEmail" label="Secondary Email"
          value={profile.secondaryEmail || ""} onChange={handleChange} />

        <Divider sx={{ my: 3 }} />

        <TextField fullWidth margin="normal" name="firstName" label="First Name"
          value={profile.firstName || ""} onChange={handleChange} />
        <TextField fullWidth margin="normal" name="lastName" label="Last Name"
          value={profile.lastName || ""} onChange={handleChange} />
        <TextField fullWidth margin="normal" name="email" label="Email"
          value={profile.email || ""} onChange={handleChange} />
        <TextField fullWidth margin="normal" name="username" label="Username"
          value={profile.username || ""} onChange={handleChange} />

        <Box mt={3}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>Update Profile</Button>
        </Box>

        <Snackbar open={toast.open} autoHideDuration={4000} onClose={() => setToast({ ...toast, open: false })}>
          <Alert severity={toast.severity}>{toast.message}</Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default ProfilePage;
