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
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import "./article.css";

const API_BASE_URL = "https://your-backend-api.com";

const ArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/blogs/${id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        setBlog(data.blog);
        setRelated(data.relatedBlogs);
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
      <Box textAlign="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (!blog) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h6" color="error">
          Blog not found.
        </Typography>
      </Box>
    );
  }

  return (
    <div className="articlePageWrapper">
      <Container maxWidth="md" className="articleCard">
        <Typography variant="h3" className="articleTitle" gutterBottom>
          {blog.title}
        </Typography>

        <Box display="flex" alignItems="center" mb={3}>
          <Avatar
            src={"/default-avatar.png"}
            alt={blog.author.firstName}
            sx={{ width: 56, height: 56, mr: 2 }}
          />
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
          src={`${API_BASE_URL}${blog.imageUrl}`}
          alt="Featured"
          className="featuredImage"
        />

        <div
          className="articleBody"
          dangerouslySetInnerHTML={{ __html: blog.body }}
        ></div>

        <Divider sx={{ my: 5 }} />

        <Typography variant="h5" gutterBottom>
          {related.length > 0
            ? "More articles from this author"
            : "More articles"}
        </Typography>

        <Grid container spacing={3}>
          {(related.length > 0 ? related : []).map((article) => (
            <Grid item xs={12} sm={6} md={4} key={article.id}>
              <Card className="previewCard" sx={{ height: "100%" }}>
                <CardActionArea onClick={() => navigate(`/blogs/${article.id}`)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`${API_BASE_URL}${article.imageUrl}`}
                    alt={article.title}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {article.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default ArticlePage;