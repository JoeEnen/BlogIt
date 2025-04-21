import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavbarMain = ({ user }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNav = (path) => {
    navigate(path);
    handleClose();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#d6f5d6", // light green
        padding: "0.7rem 4rem",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
        zIndex: 1300,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#2e7d32", cursor: "pointer" }}
          onClick={() => navigate("/blogs")}
        >
          BlogIt
        </Typography>

        <Box sx={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <Button
            onClick={() => handleNav("/blogs")}
            variant="text"
            sx={{ fontWeight: "bold", color: "#2e7d32" }}
          >
            Blogs List
          </Button>
          <Button
            onClick={() => handleNav("/write")}
            variant="text"
            sx={{ fontWeight: "bold", color: "#2e7d32" }}
          >
            Write a Blog
          </Button>
          <Button
            onClick={() => handleNav("/myblogs")}
            variant="text"
            sx={{ fontWeight: "bold", color: "#2e7d32" }}
          >
            My Blogs
          </Button>
          <Button
            onClick={() => handleNav("/article/1")}
            variant="text"
            sx={{ fontWeight: "bold", color: "#2e7d32" }}
          >
            Exciting Articles
          </Button>

          <IconButton onClick={handleProfileClick}>
            <Avatar
              src={user?.profilePicture || ""}
              sx={{
                backgroundColor: "#81c784",
                color: "#ffffff",
                fontWeight: "bold",
              }}
            >
              {!user?.profilePicture && user?.email?.[0]?.toUpperCase()}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={() => handleNav("/profile")}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarMain;
