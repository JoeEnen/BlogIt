import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

import "./write.css";

const WritePage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    body: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.excerpt || !form.body || !form.image) {
      setToast({ open: true, message: "All fields are required!", severity: "error" });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("excerpt", form.excerpt);
      formData.append("body", form.body);
      formData.append("image", form.image);

      await axios.post("https://blogit-backend.onrender.com/api/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setToast({
        open: true,
        message: "Blog post created successfully!",
        severity: "success",
      });

      setTimeout(() => navigate("/blogs"), 2000);
    } catch (err) {
      console.error(err);
      setToast({ open: true, message: "Failed to submit post.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <Container maxWidth="md" className="writeCard">
        <Typography variant="h3" align="center" gutterBottom>
          Start Writing Your Blog
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Enter your title here"
            name="title"
            value={form.title}
            onChange={handleInputChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Enter excerpt here..."
            name="excerpt"
            value={form.excerpt}
            onChange={handleInputChange}
            margin="normal"
            required
          />

          <label className="uploadttl">Upload Featured Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} required />

          <ReactQuill
            theme="snow"
            value={form.body}
            onChange={(val) => setForm((prev) => ({ ...prev, body: val }))}
            placeholder="Type your blog..."
            className="editor"
          />

          <Box display="flex" justifyContent="center" mt={4}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              className="animatedButton"
            >
              {loading ? <CircularProgress size={24} /> : "Submit Blog"}
            </Button>
          </Box>
        </form>

        <Snackbar
          open={toast.open}
          autoHideDuration={4000}
          onClose={() => setToast({ ...toast, open: false })}
        >
          <Alert severity={toast.severity}>{toast.message}</Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default WritePage;
