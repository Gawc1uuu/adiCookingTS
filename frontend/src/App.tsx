import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CreateRecipe from "./pages/CreateRecipe";
import SignleRecipe from "./pages/SignleRecipe";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="font-poppins">
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateRecipe />} />
            <Route path="/:id" element={<SignleRecipe />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
