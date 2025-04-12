import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
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
            <Button  variant="contained" color="primary" href="/login">
              Login
            </Button>
            <Button variant="contained" color="primary" href="/signup">
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
            Join a community of writers and readers.  A fun way of living.
          </Typography>
          <Box className="ctaButtons">
            <Button
              variant="contained"
              size="large"
              color="primary"
              href="/signup"
            >
              Write Your Fisrt Blog
            </Button>
            <Button
               variant="contained"
              size="large"
               color="primary"
              href="/signup"
              style={{ marginLeft: "16px" }}
            >
              EXPLORE EXITING STORIES
            </Button>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default LandingPage;
