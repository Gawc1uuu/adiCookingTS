import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CreateRecipe from "./pages/CreateRecipe";

function App() {
  return (
    <div className="font-poppins">
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateRecipe />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
