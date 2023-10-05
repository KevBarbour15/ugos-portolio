import React from "react";
import { useParams } from "react-router-dom";
import VideoAlbumDetails from "../components/VideoAlbumDetails";
import Layout from "../components/Layout";

const VideoGallery = () => {
  const { id } = useParams();

  return (
    <div>
      <Layout>
        <VideoAlbumDetails id={id} />
      </Layout>
    </div>
  );
};

export default VideoGallery;
