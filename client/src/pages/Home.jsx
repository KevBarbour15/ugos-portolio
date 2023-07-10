import React from "react";
import AlbumList from "../components/AlbumList";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  return (
    <div>
      <Header />
      <AlbumList />
      <Footer />
    </div>
  );
};

export default Home;