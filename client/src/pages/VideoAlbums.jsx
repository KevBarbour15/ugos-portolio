import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import styles from "../styles/AlbumList.module.css";
import placeholderImg from "../images/gold-bars.png";
import Header from "../components/Header";

function VideoAlbums() {
  const [albums, setAlbums] = useState([]);

  const preloadImage = (url) => {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = reject;
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
    const videoAlbums = res.data.filter(album => !album.photo);
    
    const preloadedImages = await Promise.all(
      videoAlbums.map(album => preloadImage(album.albumCover.url))
    );

    const albumsWithDimensions = preloadedImages.map((img, index) => ({
      ...videoAlbums[index],
      albumCover: videoAlbums[index].albumCover
        ? {
            url: img.src,
            width: img.naturalWidth,
            height: img.naturalHeight,
          }
        : { url: placeholderImg },
    }));

    setAlbums(shuffleArray(albumsWithDimensions));
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div>
      <Header />
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 900: 2 }}>
        <Masonry gutter="20px">
          {albums.map((album, index) => {
            const albumCover = album.albumCover.url;

            return (
              <div className={styles.album} key={album._id}>
                <Link to={`/albums/${album._id}`} className={styles.albumLink}>
                  <div className={styles.albumImage}>
                    <img src={albumCover} alt={album.title} />
                    <div className={styles.albumDescription}>{album.title}</div>
                  </div>
                </Link>
              </div>
            );
          })}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}

export default VideoAlbums;
