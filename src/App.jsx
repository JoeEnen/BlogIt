import React from "react";
import LandingPage from "./Components/Landing page/landingPage";
import SignUpPage from "./Components/Signup Page/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/Login Pg/log";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/api/signup" element={<SignUpPage />} />
        <Route path="/api/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
