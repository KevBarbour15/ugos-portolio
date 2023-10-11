import React from "react";
import styles from "../styles/DashboardHeader.module.scss";

const DashboardHeader = ({ activeTab, setActiveTab, handleLogout }) => {
  return (
    <header className={styles.dashboardHeader}>
      <nav>
        <ul className={styles.dashboardHeaderNav}>
          <li className={styles.dashboardHeaderNavItem}>
            <button
              className={`${styles.dashboardHeaderButton} ${
                activeTab === "Upload Media"
                  ? styles.dashboardHeaderButtonActive
                  : ""
              }`}
              onClick={() => setActiveTab("Upload Media")}
            >
              <span>upload</span>
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
              <span>create album</span>
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
              <span>edit album</span>
            </button>
          </li>
          <li className={styles.dashboardHeaderNavItem}>
            <button
              className={`${styles.dashboardHeaderButton} ${
                activeTab === "Edit Landing"
                  ? styles.dashboardHeaderButtonActive
                  : ""
              }`}
              onClick={() => setActiveTab("Edit Landing")}
            >
              <span>edit landing</span>
            </button>
          </li>
          <li className={styles.dashboardHeaderNavItem}>
            <button
              className={styles.dashboardHeaderButton}
              onClick={handleLogout}
            >
              <span>logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default DashboardHeader;
