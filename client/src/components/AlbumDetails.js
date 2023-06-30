import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./AlbumDetails.css";
import Header from "./Header";

///// need to fix how this loads
const AlbumDetails = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        console.log("id: ", id);
        const response = await axios.get(`/albums/${id}`);
        setAlbum(response.data);
      } catch (error) {
        console.error("Could not fetch album", error);
      }
    };

    fetchAlbum();
  }, [id]);

  if (!album) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="container">
        <h2>{album.title}</h2>
        <p>{album.description}</p>

        {album.media && album.media.length > 0 ? (
          album.media.map((media) => (
            <div className="gallery-item">
              <div className="image" key={media._id}>
                <img src={media.url} alt="media" />
              </div>
            </div>
          ))
        ) : (
          <p>No media in this album.</p>
        )}
      </div>
    </div>
  );
};

export default AlbumDetails;
