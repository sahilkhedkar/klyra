import { Routes, Route, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/dashboard";
import { Send } from "./pages/send";
import { Profile } from "./pages/profile";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/send" element={<Send/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
