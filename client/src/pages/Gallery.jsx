import React from 'react';
import { useParams } from "react-router-dom";
import PhotoAlbumDetails from "../components/PhotoAlbumDetails";
import Header from "../components/Header";
import Footer from '../components/Footer';

const Gallery = () => { 
  const { id } = useParams();
  
  return (
    <div>
      <Header />
      <PhotoAlbumDetails id={id} />
    </div>
  );
}

export default Gallery;
