import React from 'react';
import { useParams } from "react-router-dom";
import PhotoAlbumDetails from "../components/PhotoAlbumDetails";
import Header from "../components/Header";

const PhotoGallery = () => { 
  const { id } = useParams();
  // test
  return (
    <div>
      <Header />
      <PhotoAlbumDetails id={id} />
    </div>
  );
}

export default PhotoGallery;
