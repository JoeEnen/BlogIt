import React from "react";
import LandingPage from "./Components/Landing page/landingPage";
import SignUpPage from "./Components/Signup Page/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/signup" element={<SignUpPage />} />
  </Routes>
</Router>


  );
}

export default App;

