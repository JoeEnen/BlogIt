import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import worker from "../../images/blogs/worker.jpg";
import girl from "../../images/blogs/girl.jpg";
import farmer from "../../images/blogs/farmer.jpg";
import past from "../../images/blogs/past.jpg";

const blogs = [
  {
    id: "1",
    title: "I Quit My Job to Travel the World — Here’s What I Learned",
    excerpt:
      "After a decade in corporate life, I packed my bags and booked a one-way ticket. From language mishaps in Tokyo to soul-searching in Morocco, this journey changed everything...",
    imageUrl: worker,
    author: {
      username: "nomad_nina",
      avatar: "",
    },
    updatedAt: "2025-04-12",
  },
  {
    id: "2",
    title: "How a Stranger’s Kindness Healed My Broken Heart",
    excerpt:
      "I never believed in second chances—until a rainy afternoon in Paris led me to a cafe and a conversation that changed the course of my life forever...",
    imageUrl: girl,
    author: {
      username: "soulwriter23",
      avatar: "",
    },
    updatedAt: "2025-04-10",
  },
  {
    id: "3",
    title: "I Grew My Own Food for 100 Days — Here’s the Chaos That Ensued",
    excerpt:
      "From planting with zero experience to fending off a squirrel uprising, this story is part comedy, part inspiration, and all homegrown.",
    imageUrl: farmer,
    author: {
      username: "earth_ella",
      avatar: "",
    },
    updatedAt: "2025-04-08",
  },
  {
    id: "4",
    title: "Running from My Past — Literally",
    excerpt:
      "After years of avoiding my mistakes, I found clarity through marathons. This is a story about redemption, sweat, and learning to forgive yourself.",
    imageUrl: past,
    author: {
      username: "miles_of_mind",
      avatar: "",
    },
    updatedAt: "2025-04-05",
  },
];

export default function BlogList() {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: "#f0f2f9", minHeight: "100vh", py: 4, px: 2 }}>
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        sx={{ fontWeight: 600, color: "#333" }}
      >
        Discover Inspiring Stories
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {blogs.map((blog) => (
          <Grid item xs={12} md={9} key={blog.id}>
            <Card
              sx={{
                display: "flex",
                backgroundColor: "#ffffff",
                borderRadius: 3,
                boxShadow: 4,
                height: 300,
                overflow: "hidden",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.01)",
                },
              }}
            >
              <CardMedia
                component="img"
                image={blog.imageUrl}
                alt={blog.title}
                sx={{
                  width: "40%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              <Box
                sx={{
                  flex: 1,
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "#2c3e50" }}
                    gutterBottom
                  >
                    {blog.title}
                  </Typography>

                  <Box
                    sx={{
                      maxHeight: 100,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      color: "text.secondary",
                      fontSize: 14,
                    }}
                  >
                    {blog.excerpt}
                  </Box>
                </CardContent>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mt={2}
                >
                  <Box display="flex" alignItems="center">
                    <Avatar src={blog.author.avatar} sx={{ mr: 1 }}>
                      {!blog.author.avatar &&
                        blog.author.username[0].toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2">
                        {blog.author.username}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Updated on{" "}
                        {new Date(blog.updatedAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/blogs/${blog.id}`)}
                    sx={{ textTransform: "none", backgroundColor: "#1976d2" }}
                  >
                    Read More
                  </Button>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
