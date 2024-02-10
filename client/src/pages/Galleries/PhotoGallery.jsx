import React from "react";
import { useParams } from "react-router-dom";
import PhotoAlbumDetails from "../../components/AlbumDetails/PhotoAlbumDetails";
import Layout from "./../../components/Layout/Layout";

const PhotoGallery = () => {
  const { id } = useParams();
  return (
    <div>
      <Layout>
        <PhotoAlbumDetails id={id} />
      </Layout>
    </div>
  );
};

export default PhotoGallery;
