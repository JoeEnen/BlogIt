import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import LandingPage from "./Components/LandingPage/landingPage";
import SignUpPage from "./Components/SignupPage/Signup";
import LoginPage from "./Components/LoginPage/log";
import BlogList from "./Components/blogListPage/blogL";
import WritePage from "./Components/writePage/write";
import ArticlePage from "./Components/articlePage/article";
import MyBlogs from "./Components/myBlogs/mblogs";
//import EditBlog from "./Components/editBlogPage/editBlog"; 
import ProfilePage from "./Components/profilePage/profile"; 

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user:", err);
      }
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        
        <Route
          path="/write"
          element={user ? <WritePage user={user} /> : <LoginRedirect />}
        />
        <Route
          path="/myblogs"
          element={user ? <MyBlogs user={user} /> : <LoginRedirect />}
        />
        <Route
          path="/edit/:id"
          element={user ? <EditBlog user={user} /> : <LoginRedirect />}
        />
        <Route
          path="/profile"
          element={user ? <ProfilePage user={user} /> : <LoginRedirect />}
        />

        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
} 
const LoginRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, [navigate]);
  return null;
};

export default App;
