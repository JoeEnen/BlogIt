import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./Components/LandingPage/landingPage";
import SignUpPage from "./Components/SignupPage/Signup";
import LoginPage from "./Components/LoginPage/log";
import BlogList from "./Components/blogListPage/blogL";
import WritePage from "./Components/writePage/write";
import ArticlePage from "./Components/articlePage/article";
import MyBlogs from "./Components/myBlogs/mblogs";
//import EditBlog from "./Components/editBlogPage/";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
         <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/write" element={<WritePage user={user} />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        {user && (
          <>
            <Route path="/myblogs" element={<MyBlogs user={user} />} />
            <Route path="/edit/:id" element={<EditBlog user={user} />} />
          </>
        )}

        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
