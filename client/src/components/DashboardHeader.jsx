import React from "react";
import styles from "../styles/DashboardHeader.module.css";

const DashboardHeader = ({ activeTab, setActiveTab, handleLogout }) => {
  return (
    <header className={styles.dashboardHeader}>
      <nav>
        <ul>
          <li>
            <button
              className={`${styles.headerButton} ${
                activeTab === "Upload Photo" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("Upload Photo")}
            >
              Upload Photo
            </button>
          </li>
          <li>
            <button
              className={`${styles.headerButton} ${
                activeTab === "Create Album" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("Create Album")}
            >
              Create Album
            </button>
          </li>
          <li>
            <button
              className={`${styles.headerButton} ${
                activeTab === "Edit Album" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("Edit Album")}
            >
              Edit Album
            </button>
          </li>
          <li>
            <button className={styles.headerButton} onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default DashboardHeader;
