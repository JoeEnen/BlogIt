import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./landingPage.css";

const LandingPage = () => {
  return (
    <div className="landingPage">
      <AppBar position="static" color="transparent" elevation={0.5}>
        <Toolbar className="navbar">
          <Typography variant="h5" className="Milogo">
            BlogIt
          </Typography>
          <div className="Buttons">
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <Box className="heroS">
        <Container>
          <Typography variant="h2" className="heroH">
            Share your story with the world
          </Typography>
          <Typography variant="h4" className="heronarrate">
            Join a community of writers and readers. A fun way of living.
          </Typography>
          <Box className="ctaButtons">
            
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              size="large"
              color="primary"
            >
              Write Your First Blog
            </Button>
            
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              size="large"
              color="primary"
              style={{ marginLeft: "16px" }}
            >
              EXPLORE EXCITING STORIES
            </Button>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default LandingPage;
