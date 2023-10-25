import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import ReactPlayer from "react-player";
import styles from "../styles/AlbumDetails.module.scss";
import isVideo from "../helpers/video";

const VideoAlbumDetails = ({ id }) => {
  const [album, setAlbum] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
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
    <div className={styles.container}>
      <h2 className={styles.albumTitle}>{album.title}</h2>
      <p className={styles.albumInfo}>{album.description}</p>

      {album.media && album.media.length > 0 ? (
        album.media.map((media, index) => (
          <div
            key={index}
            className={styles.galleryImage}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className={styles.album}>
              {isVideo(media.url) ? (
                <ReactPlayer
                  url={media.url}
                  controls={true}
                  playing={false}
                  muted
                  width="100%" 
                  height="auto"
                />
              ) : (
                <img src={media.url} alt="" />
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No media in this album.</p>
      )}
    </div>
  );
};

export default VideoAlbumDetails;
