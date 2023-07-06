import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./AlbumDetails.css";
import Header from "./Header";
import Gallery from 'react-photo-gallery';

const AlbumDetails = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);

  // Image preloading function
  const preloadImage = (url) => {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  }

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await axios.get(`/albums/${id}`);
        // Pre-fetch images
        const preloadedImages = await Promise.all(response.data.media.map(media => preloadImage(media.url)));
        // Add width and height to media
        const mediaWithDimensions = preloadedImages.map(img => ({
          url: img.src,
          width: img.naturalWidth,
          height: img.naturalHeight
        }));
        setAlbum({...response.data, media: mediaWithDimensions});
      } catch (error) {
        console.error("Could not fetch album", error);
      }
    };
    fetchAlbum();
  }, [id]);

  if (!album) {
    return <div>Loading...</div>;
  }

  const photos = album.media.map((media) => ({
    src: media.url,
    width: media.width,
    height: media.height
  }));

  return (
    <div className="album-details">
      <Header />
      <div className="container">
        <h2>{album.title}</h2>
        <p>{album.description}</p>
        {album.media && album.media.length > 0 ? (
          <Gallery photos={photos} />
        ) : (
          <p>No media in this album.</p>
        )}
      </div>
    </div>
  );
};

export default AlbumDetails;
