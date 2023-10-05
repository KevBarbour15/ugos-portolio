import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../styles/AlbumList.module.scss";
import placeholderImg from "../images/gold-bars.png";
import Layout from "../components/Layout";
import ReactPlayer from "react-player";
import isVideo from "../helpers/video";

function VideoAlbums() {
  const [albums, setAlbums] = useState([]);

  const fetchAlbums = async () => {
    try {
      const res = await axios.get("/albums");
      const videoAlbums = res.data.filter((album) => !album.photo);

      videoAlbums.forEach((album) => {
        if (!album.albumCover) {
          album.albumCover = { url: placeholderImg };
        }
      });

      setAlbums(videoAlbums);
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div>
      <Layout>
        <div className={styles.albumGrid}>
          {albums.map((album) => {
            const albumCover = album.albumCover.url;
            console.log("albumCover " + albumCover);
            {
              console.log(isVideo(albumCover));
            }
            return (
              <div className={styles.album} key={album._id}>
                <Link to={`/video/${album._id}`} className={styles.albumLink}>
                  <div className={styles.albumImage}>
                    {isVideo(albumCover) ? (
                      <ReactPlayer
                        url={albumCover}
                        playing
                        muted
                        loop
                        playsinline
                        style={{ pointerEvents: "none" }}
                      />
                    ) : (
                      <img src={albumCover} alt={album.title} />
                    )}
                    <div className={styles.albumDescription}>{album.title}</div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </Layout>
    </div>
  );
}

export default VideoAlbums;
