import React from "react";
import "./DashboardHeader.css";

const DashboardHeader = ({ activeTab, setActiveTab, handleLogout }) => {
  return (
    <header className="dashboard-header">
      <nav>
        <ul>
          <li>
            <button
              className={activeTab === "Create Album" ? "active" : ""}
              onClick={() => setActiveTab("Create Album")}
            >
              Create Album
            </button>
          </li>
          <li>
            <button
              className={activeTab === "Edit Album" ? "active" : ""}
              onClick={() => setActiveTab("Edit Album")}
            >
              Edit Album
            </button>
          </li>
          <li>
            <button
              className={activeTab === "Upload Photo" ? "active" : ""}
              onClick={() => setActiveTab("Upload Photo")}
            >
              Upload Photo
            </button>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default DashboardHeader;
