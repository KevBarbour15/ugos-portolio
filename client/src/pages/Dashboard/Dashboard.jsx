import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.scss";
import AuthContext from "../../context/AuthContext";
import CreateAlbum from "../../components/DashboardComponents/CreateAlbum";
import UploadMedia from "../../components/DashboardComponents/UploadMedia";
import EditAlbum from "../../components/DashboardComponents/EditAlbum";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import Layout from "./../../components/Layout/Layout";

const Dashboard = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("Upload Media");

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    navigate("/");
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
