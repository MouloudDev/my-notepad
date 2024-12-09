import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/loginForm";
import Home from "./components/home";
import ProtectedRoute from "./components/protectedRoute";
import Signup from "./components/signupForm";

function App() {
  useEffect(() => {
    document
      .getElementById("root")
      .classList
      .add("dark:bg-[#252627]")
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
