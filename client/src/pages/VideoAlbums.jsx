import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import styles from "../styles/AlbumList.module.css";
import placeholderImg from "../images/gold-bars.png";
import Header from "../components/Header";
import Footer from "../components/Footer";

import ReactPlayer from "react-player";

function VideoAlbums() {
  const [albums, setAlbums] = useState([]);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const fetchAlbums = async () => {
    try {
      const res = await axios.get("/albums");
      const videoAlbums = res.data.filter((album) => !album.photo);

      videoAlbums.forEach((album) => {
        if (!album.albumCover) {
          album.albumCover = { url: placeholderImg };
        }
      });

      setAlbums(shuffleArray(videoAlbums));
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const isVideo = (url) => {
    return [".mp4", ".webm", ".ogg",".mov"].some((extension) =>
      url.endsWith(extension)
    );
  };

  return (
    <div>
      <Header />
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 900: 1 }}>
        <Masonry>
          {albums.map((album) => {
            const albumCover = album.albumCover.url;

            return (
              <div className={styles.album} key={album._id}>
                <Link to={`/video/${album._id}`} className={styles.albumLink}>
                  <div className={styles.albumImage}>
                    {isVideo(albumCover) ? (
                      <ReactPlayer
                        url={albumCover}
                        playing
                        muted
                        width="100%"
                        height="100%"
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
        </Masonry>
      </ResponsiveMasonry>
      <Footer />
    </div>
  );
}

export default VideoAlbums;
