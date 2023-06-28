import React from "react";
import CreateAlbum from "./CreateAlbum";
import UploadPhoto from "./UploadPhoto";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <CreateAlbum />
      <UploadPhoto />
    </div>
  );
};

export default Dashboard;
