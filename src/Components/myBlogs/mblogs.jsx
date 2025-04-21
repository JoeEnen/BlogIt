import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Box,
  Snackbar,
  Alert,
  Fade,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavbarMain from "../navbarmain";
import apiUrl from "../../Util/apiUrl";
import "./mblogs.css";

const MyBlogs = ({ user }) => {
  const [blogs, setBlogs] = useState([]);
  const [toast, setToast] = useState({ open: false, message: "", severity: "info" });
  const navigate = useNavigate();

  const fetchMyBlogs = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/myblogs/${user.id}`);
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.id) fetchMyBlogs();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await fetch(`${apiUrl}/api/blogs/${id}`, { method: "DELETE" });
      setToast({ open: true, message: "Deleted successfully", severity: "success" });
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch {
      setToast({ open: true, message: "Failed to delete", severity: "error" });
    }
  };

  return (
    <>
      <NavbarMain user={user} />

      <Box sx={{ pt: 12, minHeight: "100vh", backgroundColor: "#f0f2f9", px: 2 }}>
        <Container maxWidth="md">
          <Box
            sx={{
              backgroundColor: "#d6f5d6",
              padding: "1.2rem",
              borderRadius: "10px",
              mb: 4,
              textAlign: "center",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#2e7d32" }}>
              My Blogs
            </Typography>
          </Box>

          <Box textAlign="right" mb={3}>
            <Button
              variant="contained"
              onClick={() => navigate("/write")}
              sx={{
                backgroundColor: "#2e7d32",
                fontWeight: "bold",
                px: 3,
                py: 1,
                "&:hover": { backgroundColor: "#27642b" },
                transition: "all 0.3s ease",
              }}
            >
              Create New Blog
            </Button>
          </Box>

          {blogs.length === 0 ? (
            <Typography align="center" color="text.secondary" sx={{ mt: 8 }}>
              You haven't written any blogs yet.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {blogs.map((blog, index) => (
                <Grid item xs={12} key={blog.id}>
                  <Fade in timeout={500 + index * 200}>
                    <Card
                      sx={{
                        borderRadius: 3,
                        boxShadow: 4,
                        backgroundColor: "#ffffff",
                        transition: "0.3s",
                        "&:hover": {
                          transform: "scale(1.01)",
                          boxShadow: 6,
                        },
                      }}
                    >
                      <CardContent>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                          {blog.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Published on {new Date(blog.createdAt).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body1" mt={2}>
                          {blog.excerpt}
                        </Typography>

                        <Box mt={3} display="flex" gap={2}>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => navigate(`/edit/${blog.id}`)}
                            sx={{
                              fontWeight: "bold",
                              transition: "all 0.2s ease-in-out",
                              "&:hover": { transform: "scale(1.05)" },
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleDelete(blog.id)}
                            sx={{
                              fontWeight: "bold",
                              transition: "all 0.2s ease-in-out",
                              "&:hover": { transform: "scale(1.05)" },
                            }}
                          >
                            Delete
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          )}
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

export default MyBlogs;
