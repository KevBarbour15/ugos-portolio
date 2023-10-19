import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import styles from "../styles/AlbumDetails.module.scss";

const PhotoAlbumDetails = ({ id }) => {
  const [album, setAlbum] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

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

  const fetchAlbum = async () => {
    try {
      const response = await axios.get(`/albums/${id}`);
      const albumData = response.data;

      const preloadedImages = await Promise.all(
        albumData.media.map((media) => preloadImage(media.url))
      );

      const mediaWithDimensions = preloadedImages.map((img, index) => {
        const orientation =
          img.naturalWidth > img.naturalHeight ? "landscape" : "portrait";

        return {
          ...albumData.media[index],
          orientation,
          url: img.src,
          width: img.naturalWidth,
          height: img.naturalHeight,
        };
      });

      setAlbum({ ...albumData, media: mediaWithDimensions });
    } catch (error) {
      console.error("Could not fetch album", error);
    }
  };

  useEffect(() => {
    fetchAlbum();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.albumTitle}>{album?.title}</h2>
      <p className={styles.albumInfo}>{album?.description}</p>

      {album?.media && album.media.length > 0 ? (
        <div className={styles.mediaContainer}>
          {album.media.map((media, index) => (
            <div
              key={index}
              className={`${styles.album} ${
                media.orientation === "landscape"
                  ? styles.landscape
                  : styles.portrait
              }`}
              onClick={() => {
                setPhotoIndex(index);
                setIsOpen(true);
              }}
            >
              <div className={styles.galleryImage}>
                <img src={media.url} alt="" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No media in this album.</p>
      )}

      {isOpen && (
        <Lightbox
          mainSrc={album.media[photoIndex].url}
          nextSrc={album.media[(photoIndex + 1) % album.media.length].url}
          prevSrc={
            album.media[
              (photoIndex + album.media.length - 1) % album.media.length
            ].url
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + album.media.length - 1) % album.media.length
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % album.media.length)
          }
        />
      )}
    </div>
  );
};

export default PhotoAlbumDetails;
