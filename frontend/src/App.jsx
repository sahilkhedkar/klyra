import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/send" element={<Send/>}/>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
