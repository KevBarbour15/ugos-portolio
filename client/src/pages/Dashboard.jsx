import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Dashboard.module.scss";
import AuthContext from "../context/AuthContext";
import CreateAlbum from "../components/CreateAlbum";
import UploadPhoto from "../components/UploadPhoto";
import UploadVideo from "../components/UploadVideo";
import UploadMedia from "../components/UploadMedia";
import EditAlbum from "../components/EditAlbum";
import EditLanding from "../components/EditLanding";
import DashboardHeader from "../components/DashboardHeader";
import Layout from "../components/Layout";
import { successNotification } from "../helpers/notifications";

const Dashboard = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("Create Album");

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    navigate("/home");
    successNotification("Successfully logged out.", null);
    localStorage.removeItem("token");
    setIsAuthenticated(false);
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
    case "Upload Video":
      CurrentComponent = UploadVideo;
      break;
    case "Upload Media":
      CurrentComponent = UploadMedia;
      break;
    case "Edit Landing":
      CurrentComponent = EditLanding;
      break;
    default:
      CurrentComponent = () => <div></div>;
  }

  return (
    <div className={styles.container}>
      <Layout>
        <DashboardHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleLogout={handleLogout}
        />
        <div>
          <CurrentComponent />
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;
