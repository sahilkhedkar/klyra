import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/dashboard";
import { Send } from "./pages/send";
import { Profile } from "./pages/profile";

function App() {

  return (
    <>
     <BrowserRouter>
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
     </BrowserRouter>
    </>
  )
}

export default App
