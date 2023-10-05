import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import PhotoGallery from "./pages/PhotoGallery"; 
import VideoGallery from "./pages/VideoGallery";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import PhotoAlbums from "./pages/PhotoAlbums";
import VideoAlbums from "./pages/VideoAlbums";
import AuthContext from "./context/AuthContext";
import "./App.css";

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
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<PhotoAlbums/>} />
            <Route path="/photo/:id" element={<PhotoGallery />} />
            <Route path="/video/:id" element={<VideoGallery />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/videos" element={<VideoAlbums />} />
          </Routes>
        </div>
      </AuthContext.Provider>
    </>
  );
}

export default App;