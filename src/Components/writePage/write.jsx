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
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

import NavbarMain from "../navbarmain";
import "./write.css";

const WritePage = ({ user }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    body: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isDraft, setIsDraft] = useState(false);

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
      formData.append("authorId", user?.id);
      formData.append("draft", isDraft);

      await axios.post("https://blogit-backend.onrender.com/api/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setToast({
        open: true,
        message: isDraft ? "Draft saved successfully!" : "Blog post published!",
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
    <>
      <NavbarMain user={user} />

      <Box className="main" sx={{ pt: 10, minHeight: "100vh", backgroundColor: "#f7f8f9" }}>
        <Container maxWidth="lg">
          <Paper
            elevation={4}
            sx={{
              padding: "2.5rem",
              backgroundColor: "#fdf6e4",
              borderRadius: "10px",
              minHeight: "90vh",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#a0c6ff",
                padding: "1rem 2rem",
                borderRadius: "6px",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "#143a5d", letterSpacing: "1px" }}
              >
                Start Writing Your Blog
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Enter your title here"
                name="title"
                value={form.title}
                onChange={handleInputChange}
                margin="normal"
                required
                sx={{ backgroundColor: "#fffde7", borderRadius: "5px" }}
              />

              <TextField
                fullWidth
                label="Enter excerpt here..."
                name="excerpt"
                value={form.excerpt}
                onChange={handleInputChange}
                margin="normal"
                required
                sx={{ backgroundColor: "#fffde7", borderRadius: "5px" }}
              />

              <label className="uploadttl">Upload Featured Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} required />

              <ReactQuill
                theme="snow"
                value={form.body}
                onChange={(val) => setForm((prev) => ({ ...prev, body: val }))}
                placeholder="Type your blog content..."
                className="editor"
                style={{ backgroundColor: "#fff", borderRadius: "6px", marginTop: "1rem" }}
              />

              <Box display="flex" justifyContent="center" gap={2} mt={4}>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => {
                    setIsDraft(true);
                    handleSubmit(new Event("submit"));
                  }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={20} /> : "Save as Draft"}
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setPreviewOpen(true)}
                >
                  Preview
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Publish Blog"}
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
          </Paper>
        </Container>
      </Box>

      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Blog Preview</DialogTitle>
        <DialogContent dividers>
          <Typography variant="h5" fontWeight="bold">{form.title}</Typography>
          <Typography variant="subtitle1" color="text.secondary" mb={2}>
            {form.excerpt}
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: form.body }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WritePage;
