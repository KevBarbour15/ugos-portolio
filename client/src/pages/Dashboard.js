import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import CreateAlbum from "../components/CreateAlbum";
import UploadPhoto from "../components/UploadPhoto";
import Header from "../components/Header";

const Dashboard = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/Home");
  };

  return (
    <div>
      <Header />
      <CreateAlbum />
      <UploadPhoto />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
