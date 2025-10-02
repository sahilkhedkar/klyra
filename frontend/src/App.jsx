import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
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
  const location = useLocation();
  const initialLoad = useRef(true);

  useEffect(() => {
    if (initialLoad.current && !loading && isAuthenticated && (location.pathname === "/" || location.pathname === "/signin" || location.pathname === "/signup")) {
      navigate("/dashboard");
      initialLoad.current = false;
    }
  }, [isAuthenticated, loading, navigate, location.pathname]);

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
