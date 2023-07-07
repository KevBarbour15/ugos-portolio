import React from 'react';
import { useParams } from "react-router-dom";
import AlbumDetails from "../components/AlbumDetails";
import Header from "../components/Header";
import Footer from '../components/Footer';

const Gallery = () => { 
  const { id } = useParams();
  
  return (
    <div>
      <Header />
      <AlbumDetails id={id} />
      <Footer />
    </div>
  );
}

export default Gallery;
