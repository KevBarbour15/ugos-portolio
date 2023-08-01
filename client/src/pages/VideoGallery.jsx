import React from 'react';
import { useParams } from "react-router-dom";
import VideoAlbumDetails from "../components/VideoAlbumDetails";
import Header from "../components/Header";

const VideoGallery = () => { 
  const { id } = useParams();

  return (
    <div>
      <Header />
      <VideoAlbumDetails id={id} />
    </div>
  );
}

export default VideoGallery;
