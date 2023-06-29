import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import CreateAlbum from "../components/CreateAlbum";
import UploadPhoto from "../components/UploadPhoto";
import EditAlbum from "../components/EditAlbum";
import Header from "../components/Header";
import DashboardHeader from "../components/DashboardHeader";

const Dashboard = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("Upload Photo");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/home");
  };

  let CurrentComponent;
  switch (activeTab) {
    case "Create Album":
      CurrentComponent = CreateAlbum;
      break;
    case "Edit Album":
      CurrentComponent = EditAlbum;
      break;
    case "Upload Photo":
      CurrentComponent = UploadPhoto;
      break;
    default:
      CurrentComponent = () => <div>Select an option</div>;
  }

  return (
    <div>
      <Header />
      <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />
      <div>
        <CurrentComponent />
      </div>
    </div>
  );
};

export default Dashboard;
