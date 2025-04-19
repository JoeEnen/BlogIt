import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = ({ activePage }) => {
  const navigate = useNavigate();

  const handleNav = (path) => {
    if (activePage !== path) navigate(`/${path}`);
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
          onClick={() => navigate("/")}
        >
          BlogIt
        </Typography>

        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Button
            variant="outlined"
            disabled={activePage === "login"}
            onClick={() => handleNav("login")}
            sx={{ fontWeight: "bold", color: "#2e7d32", borderColor: "#2e7d32" }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            disabled={activePage === "signup"}
            onClick={() => handleNav("signup")}
            sx={{ backgroundColor: "#2e7d32", fontWeight: "bold" }}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
