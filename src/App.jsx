import React from "react";
import LandingPage from "./Components/LandingPage/landingPage";
import SignUpPage from "./Components/SignupPage/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage/log";
import BlogList from "./Components/blogListPage/blogL";
import WritePage from "./Components/writePage/write" ;
import ArticlePage from "./Components/articlePage/article" ;


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/blogs" element={<BlogList />} /> 
        <Route path="/write" element={<WritePage />} />
        <Route path="/article" element={<ArticlePage />} />

        <Route path="*" element={<div>404 - Page Not Found</div>} />

      </Routes>
    </Router>
  );
}

export default App;
