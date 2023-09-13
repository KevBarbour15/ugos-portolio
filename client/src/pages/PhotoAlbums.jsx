import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../styles/AlbumList.module.css";
import placeholderImg from "../images/gold-bars.png";
import Header from "../components/Header";
import Footer from "../components/Footer";

function PhotoAlbums() {
  const [albums, setAlbums] = useState([]);

  const preloadImage = (url) => {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = url;
      img.onload = () => {
        resolve(img);
      };
      img.onerror = (error) => {
        console.error("Error loading image:", url, error);
        reject(error);
      };
    });
  };

  const fetchAlbums = async () => {
    const res = await axios.get("/albums");
    const photoAlbums = res.data.filter((album) => album.photo);

    await Promise.all(
      photoAlbums.map((album) => {
        if (!album.albumCover || album.albumCover.url === null) {
          album.albumCover = { url: placeholderImg };
        }
        return preloadImage(album.albumCover.url).catch((err) => {
          console.error("Failed to load an image", err);
          let dummyImage = new Image();
          dummyImage.src = placeholderImg;
          return dummyImage;
        });
      })
    );

    setAlbums(photoAlbums);
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.albumGrid}>
        {albums.map((album) => (
          <div className={styles.album} key={album._id}>
            <Link to={`/photo/${album._id}`} className={styles.albumLink}>
              <div className={styles.albumImage}>
                <img src={album.albumCover.url} alt={album.title} />
                <div className={styles.albumDescription}>{album.title}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default PhotoAlbums;
