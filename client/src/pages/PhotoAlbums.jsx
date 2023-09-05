import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
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

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const fetchAlbums = async () => {
    const res = await axios.get("/albums");

    const photoAlbums = res.data.filter((album) => album.photo);

    const preloadedImages = await Promise.all(
      photoAlbums.map((album) => {
        if (!album.albumCover || album.albumCover.url === null) {
          album.albumCover = { url: placeholderImg };
        }
        return preloadImage(album.albumCover.url).catch((err) => {
          console.error("Failed to load an image", err);
          let dummyImage = new Image();
          dummyImage.src = placeholderImg; // default to the placeholder image
          return dummyImage;
        });
      })
    );

    const albumsWithDimensions = preloadedImages.map((img, index) => {
      const orientation =
        img.naturalWidth > img.naturalHeight ? "landscape" : "portrait";

      return {
        ...photoAlbums[index],
        orientation,
        albumCover: photoAlbums[index].albumCover
          ? {
              url: img.src,
              width: img.naturalWidth,
              height: img.naturalHeight,
            }
          : { url: placeholderImg },
      };
    });

    const landscapeAlbums = albumsWithDimensions.filter(
      (album) => album.orientation === "landscape"
    );
    const portraitAlbums = albumsWithDimensions.filter(
      (album) => album.orientation === "portrait"
    );

    setAlbums(shuffleArray(albumsWithDimensions));
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div>
      <Header />
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 900: 2 }}>
        <Masonry>
          {albums
            .filter((album) => album.orientation === "landscape")
            .map((album) => (
              <div className={styles.album} key={album._id}>
                <Link to={`/photo/${album._id}`} className={styles.albumLink}>
                  <div className={styles.albumImage}>
                    <img src={album.albumCover.url} alt={album.title} />
                    <div className={styles.albumDescription}>{album.title}</div>
                  </div>
                </Link>
              </div>
            ))}

          {albums
            .filter((album) => album.orientation === "portrait")
            .map((album) => (
              <div className={styles.album} key={album._id}>
                <Link to={`/photo/${album._id}`} className={styles.albumLink}>
                  <div className={styles.albumImage}>
                    <img src={album.albumCover.url} alt={album.title} />
                    <div className={styles.albumDescription}>{album.title}</div>
                  </div>
                </Link>
              </div>
            ))}
        </Masonry>
      </ResponsiveMasonry>
      <Footer />
    </div>
  );
}

export default PhotoAlbums;
