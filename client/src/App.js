import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home"; // includes Header and AlbumList
import Gallery from "./pages/Gallery"; // includes Header and AlbumDetails
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";

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
            <Route path="/home" element={<Home />} />
            <Route path="/albums/:id" element={<Gallery />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </AuthContext.Provider>
    </>
  );
}

export default App;
