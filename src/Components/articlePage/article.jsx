import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Avatar,
  Box,
  Divider,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import NavbarMain from "../navbarmain";
import apiUrl from "../../Util/apiUrl";
import "./article.css";

const ArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/blogs/${id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        setBlog(data.blog);
        setRelated(data.relatedBlogs || []);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <>
        <NavbarMain />
        <Box textAlign="center" mt={12}>
          <CircularProgress />
        </Box>
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <NavbarMain />
        <Box textAlign="center" mt={12}>
          <Typography variant="h6" color="error">
            Blog not found.
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <NavbarMain />

      <Box sx={{ pt: 12, backgroundColor: "#f0f2f9", minHeight: "100vh" }}>
        <Container maxWidth="md">
          <Paper
            elevation={3}
            sx={{
              padding: "2rem",
              backgroundColor: "#d6f5d6",
              borderRadius: "12px",
              mb: 4,
            }}
          >
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#2e7d32" }}
            >
              {blog.title}
            </Typography>
          </Paper>

          <Box display="flex" alignItems="center" mb={3}>
            <Avatar
              src={blog.author.profilePicture || ""}
              alt={blog.author.firstName}
              sx={{ width: 56, height: 56, mr: 2, bgcolor: "#81c784" }}
            >
              {!blog.author.profilePicture &&
                blog.author.email?.[0]?.toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="body1" fontWeight={600}>
                {blog.author.firstName} {blog.author.lastName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Last updated: {new Date(blog.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>

          <img
            src={`${apiUrl}${blog.imageUrl}`}
            alt="Featured"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              marginBottom: "1.5rem",
              objectFit: "cover",
            }}
          />

          <div
            className="articleBody"
            dangerouslySetInnerHTML={{ __html: blog.body }}
            style={{
              paddingBottom: "2rem",
              color: "#333",
              lineHeight: 1.7,
              fontSize: "1.1rem",
            }}
          />

          <Divider sx={{ my: 5 }} />

          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            {related.length > 0
              ? "More articles from this author"
              : "More articles"}
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {(related.length > 0 ? related : []).map((article, idx) => (
              <Grid item xs={12} sm={10} md={10} key={article.id}>
                <Card
                  sx={{
                    display: "flex",
                    height: 200,
                    borderRadius: 3,
                    overflow: "hidden",
                    backgroundColor: idx % 2 === 0 ? "#fff9f0" : "#e0f7fa",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.01)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => navigate(`/article/${article.id}`)}
                    sx={{ display: "flex", width: "100%" }}
                  >
                    <CardMedia
                      component="img"
                      image={`${apiUrl}${article.imageUrl}`}
                      alt={article.title}
                      sx={{ width: "35%", objectFit: "cover" }}
                    />
                    <CardContent sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {article.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {article.excerpt.slice(0, 120)}...
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ArticlePage;
