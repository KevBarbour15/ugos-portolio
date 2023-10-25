import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Dashboard.module.scss";
import AuthContext from "../context/AuthContext";
import CreateAlbum from "../components/CreateAlbum";
import UploadMedia from "../components/UploadMedia";
import EditAlbum from "../components/EditAlbum";
import EditLanding from "../components/EditLanding";
import DashboardHeader from "../components/DashboardHeader";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("Create Album");

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/Login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    navigate("/Home");
    toast.success("Successfully logged out.");
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
