import React from "react";
import styles from "../styles/DashboardHeader.module.css";

const DashboardHeader = ({ activeTab, setActiveTab, handleLogout }) => {

  return (
    <header className={styles.dashboardHeader}>
      <nav>
        <ul className={styles.dashboardHeaderNav}>
          <li className={styles.dashboardHeaderNavItem}>
            <button
              className={`${styles.dashboardHeaderButton} ${
                activeTab === "Upload Photo"
                  ? styles.dashboardHeaderButtonActive
                  : ""
              }`}
              onClick={() => setActiveTab("Upload Photo")}
            >
              Upload Photo
            </button>
          </li>
          <li className={styles.dashboardHeaderNavItem}>
            <button
              className={`${styles.dashboardHeaderButton} ${
                activeTab === "Upload Video"
                  ? styles.dashboardHeaderButtonActive
                  : ""
              }`}
              onClick={() => setActiveTab("Upload Video")}
            >
              Upload Video
            </button>
          </li>
          <li className={styles.dashboardHeaderNavItem}>
            <button
              className={`${styles.dashboardHeaderButton} ${
                activeTab === "Create Album"
                  ? styles.dashboardHeaderButtonActive
                  : ""
              }`}
              onClick={() => setActiveTab("Create Album")}
            >
              Create Album
            </button>
          </li>
          <li className={styles.dashboardHeaderNavItem}>
            <button
              className={`${styles.dashboardHeaderButton} ${
                activeTab === "Edit Album"
                  ? styles.dashboardHeaderButtonActive
                  : ""
              }`}
              onClick={() => setActiveTab("Edit Album")}
            >
              Edit Album
            </button>
          </li>
          <li className={styles.dashboardHeaderNavItem}>
            <button
              className={styles.dashboardHeaderButton}
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default DashboardHeader;
