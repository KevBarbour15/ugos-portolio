import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import PhotoGallery from "./pages/Galleries/PhotoGallery";
import VideoGallery from "./pages/Galleries/VideoGallery";
import Login from "./components/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import About from "./pages/About/About";
import PhotoAlbums from "./pages/Albums/PhotoAlbums";
import VideoAlbums from "./pages/Albums/VideoAlbums";
import AuthContext from "./context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./App.scss";

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
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
        />
        <div>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/Home" element={<PhotoAlbums />} />
            <Route path="/Photo/:id" element={<PhotoGallery />} />
            <Route path="/Video/:id" element={<VideoGallery />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/About" element={<About />} />
            <Route path="/Videos" element={<VideoAlbums />} />
          </Routes>
        </div>
      </AuthContext.Provider>
    </>
  );
}

export default App;
