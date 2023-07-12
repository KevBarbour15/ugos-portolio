import React from "react";
import styles from "../styles/DashboardHeader.module.css";

const DashboardHeader = ({ activeTab, setActiveTab, handleLogout }) => {
  // need to make this sticky and so that the content does not go out of it to extend page
  // how do i do this?
  
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
