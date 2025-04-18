import React, { useEffect, useState } from "react";
import {
  Container, Typography, Button, Card, CardContent, Grid, Box, Snackbar, Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
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
      setBlogs(blogs.filter((b) => b.id !== id));
    } catch {
      setToast({ open: true, message: "Failed to delete", severity: "error" });
    }
  };

  return (
    <Container maxWidth="md" className="myBlogsWrapper">
      <Typography variant="h4" gutterBottom>My Blogs</Typography>
      <Box textAlign="right" mb={2}>
        <Button variant="contained" color="primary" onClick={() => navigate("/write")}>
          Create New Blog
        </Button>
      </Box>

      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} key={blog.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{blog.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" mt={1}>{blog.excerpt}</Typography>
                <Box mt={2}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(`/edit/${blog.id}`)}
                    sx={{ mr: 2 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar open={toast.open} autoHideDuration={4000} onClose={() => setToast({ ...toast, open: false })}>
        <Alert severity={toast.severity}>{toast.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default MyBlogs;
