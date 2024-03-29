import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import PhotoGallery from "./pages/Galleries/PhotoGallery";
import VideoGallery from "./pages/Galleries/VideoGallery";
import Login from "./components/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import About from "./pages/About/About";
import AuthContext from "./context/AuthContext";
import "./App.scss";

// GSAP animations
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/all";
gsap.registerPlugin(ScrambleTextPlugin);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          isAuthenticated,
          setIsAuthenticated,
        }}
      >
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="photo-collection/:id" element={<PhotoGallery />} />
            <Route path="/video-collection/:id" element={<VideoGallery />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/About" element={<About />} />
          </Routes>
        </div>
      </AuthContext.Provider>
    </>
  );
}

export default App;
