import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./landingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("user");

  const handleProtectedNavigation = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="landingPage">
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          backgroundColor: isLoggedIn ? "#2e7d32" : "transparent",
        }}
      >
        <Toolbar className="navbar">
          <Typography
            variant="h4"
            className="Milogo"
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer" }}
          >
            BlogIt
          </Typography>

          <Box className="Buttons">
            <Button onClick={() => handleProtectedNavigation("/about")} color="inherit">
              About BlogIt
            </Button>
            <Button onClick={() => handleProtectedNavigation("/blogs")} color="inherit">
              Explore Blogs
            </Button>
            <Button onClick={() => handleProtectedNavigation("/write")} color="inherit">
              Write
            </Button>
            <Button onClick={() => handleProtectedNavigation("/myblogs")} color="inherit">
              My Blogs
            </Button>
            <Button onClick={() => handleProtectedNavigation("/profile")} color="inherit">
              My Profile
            </Button>

            {!isLoggedIn && (
              <>
                <Button
                  onClick={() => navigate("/login")}
                  variant="outlined"
                  sx={{ ml: 1 }}
                  color="primary"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  variant="contained"
                  sx={{ ml: 1 }}
                  color="primary"
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar >
      </AppBar>
      
      <Toolbar />

      <Box className="heroS">
        <div className="heroContent">
          <Container>
            <Typography variant="h2" className="heroH">
              Share your story with the world
            </Typography>
            <Typography variant="h4" className="heronarrate">
              Join a community of writers and readers. A fun way of living.
            </Typography>
            <Box className="ctaButtons">
              <Button
                onClick={() => handleProtectedNavigation("/write")}
                variant="contained"
                size="large"
                color="primary"
              >
                Write Your First Blog
              </Button>

              <Button
                onClick={() => handleProtectedNavigation("/blogs")}
                variant="contained"
                size="large"
                color="secondary"
              >
                Explore Exiting Stories
              </Button>
            </Box>
          </Container>
        </div>
      </Box>
    </div>
  );
};

export default LandingPage;
