import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Divider,
  Snackbar,
  Alert,
  Avatar,
  IconButton,
} from "@mui/material";
import { PhotoCamera, Delete } from "@mui/icons-material";
import axios from "axios";
import NavbarMain from "../navbarmain";
import apiUrl from "../../Util/apiUrl";
import "./profile.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState({});
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(data);
      setPreviewUrl(data.profilePicture ? `${apiUrl}${data.profilePicture}` : "");
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

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleImageDelete = () => {
    setImageFile(null);
    setPreviewUrl("");
    setProfile((prev) => ({ ...prev, profilePicture: "" }));
  };

  const updateProfile = async () => {
    try {
      const formData = new FormData();
      Object.entries(profile).forEach(([key, val]) => {
        if (val) formData.append(key, val);
      });
      if (imageFile) {
        formData.append("profilePicture", imageFile);
      }

      await axios.put(`${apiUrl}/api/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setToast({ open: true, message: "Profile updated successfully!", severity: "success" });
    } catch (err) {
      setToast({
        open: true,
        message: err.response?.data?.message || "Error updating profile",
        severity: "error",
      });
    }
  };

  const updatePersonalInfo = async () => {
    try {
      await axios.put(`${apiUrl}/api/personal`, profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setToast({ open: true, message: "Personal info updated", severity: "success" });
    } catch (err) {
      setToast({
        open: true,
        message: err.response?.data?.message || "Error updating info",
        severity: "error",
      });
    }
  };

  const updatePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      return setToast({ open: true, message: "Passwords do not match", severity: "error" });
    }

    try {
      await axios.put(
        `${apiUrl}/api/password`,
        { oldPassword: passwords.oldPassword, newPassword: passwords.newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setToast({ open: true, message: "Password updated", severity: "success" });
    } catch (err) {
      setToast({
        open: true,
        message: err.response?.data?.message || "Failed to update password",
        severity: "error",
      });
    }
  };

  return (
    <>
      <NavbarMain activePage="profile" />

      <Box className="profileBg" sx={{ pt: 12, pb: 6, backgroundColor: "#f0f2f9", minHeight: "100vh" }}>
        <Container maxWidth="md" className="profileCard" sx={{ backgroundColor: "#fff3e0", borderRadius: 3, p: 4 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              backgroundColor: "#ffe0b2",
              padding: "0.5rem 1rem",
              borderRadius: 2,
              fontWeight: "bold",
              color: "#e65100",
            }}
          >
            My Profile
          </Typography>
 
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <Avatar src={previewUrl} sx={{ width: 70, height: 70, bgcolor: "#a5d6a7" }}>
              {!previewUrl && profile.email?.[0]?.toUpperCase()}
            </Avatar>
            <label htmlFor="upload-img">
              <input
                accept="image/*"
                id="upload-img"
                type="file"
                hidden
                onChange={handleImageChange}
              />
              <IconButton color="primary" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
            {previewUrl && (
              <IconButton color="error" onClick={handleImageDelete}>
                <Delete />
              </IconButton>
            )}
          </Box>
 
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Profile Info
          </Typography>
          {["phone", "occupation", "bio", "status", "secondaryEmail"].map((field) => (
            <TextField
              key={field}
              fullWidth
              name={field}
              label={field.replace(/([A-Z])/g, " $1")}
              value={profile[field] || ""}
              onChange={handleChange}
              margin="normal"
              sx={{ backgroundColor: "#f9fbe7", borderRadius: 1 }}
            />
          ))}

          <Button onClick={updateProfile} variant="contained" sx={{ mt: 2 }} color="primary">
            Update Profile
          </Button>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" color="text.secondary" gutterBottom>
            Personal Info
          </Typography>
          {["firstName", "lastName", "email", "username"].map((field) => (
            <TextField
              key={field}
              fullWidth
              name={field}
              label={field.replace(/([A-Z])/g, " $1")}
              value={profile[field] || ""}
              onChange={handleChange}
              margin="normal"
              sx={{ backgroundColor: "#e8f5e9", borderRadius: 1 }}
            />
          ))}

          <Button onClick={updatePersonalInfo} variant="contained" sx={{ mt: 2 }} color="primary">
            Update Personal Info
          </Button>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" color="text.secondary" gutterBottom>
            Update Password
          </Typography>
          <TextField
            fullWidth
            type="password"
            name="oldPassword"
            label="Old Password"
            value={passwords.oldPassword}
            onChange={handlePasswordChange}
            margin="normal"
            sx={{ backgroundColor: "#e1f5fe", borderRadius: 1 }}
          />
          <TextField
            fullWidth
            type="password"
            name="newPassword"
            label="New Password"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
            margin="normal"
            sx={{ backgroundColor: "#e1f5fe", borderRadius: 1 }}
          />
          <TextField
            fullWidth
            type="password"
            name="confirmPassword"
            label="Confirm New Password"
            value={passwords.confirmPassword}
            onChange={handlePasswordChange}
            margin="normal"
            sx={{ backgroundColor: "#e1f5fe", borderRadius: 1 }}
          />

          <Button onClick={updatePassword} variant="contained" sx={{ mt: 2 }} color="primary">
            Update Password
          </Button>
        </Container>

        <Snackbar
          open={toast.open}
          autoHideDuration={4000}
          onClose={() => setToast({ ...toast, open: false })}
        >
          <Alert severity={toast.severity}>{toast.message}</Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default ProfilePage;