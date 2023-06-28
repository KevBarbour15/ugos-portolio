import React from "react";
import AlbumList from "../components/AlbumList";
import Login from "../components/Login";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Ugo's Portfolio!</h1>
      <AlbumList />
      <Login />
    </div>
  );
};

export default Home;
