import React, { useEffect, useState } from "react";
import axios from "axios";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import styles from "../styles/AlbumDetails.module.scss";

const PhotoAlbumDetails = ({ id }) => {
  const [album, setAlbum] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  // TODO: have the photos organize correctly based on dimensions
  // TODO: have the portait photos display correctly and same size

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
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 900: 2 }}>
          <Masonry>
            {album.media
              .filter((media) => media.orientation === "landscape")
              .map((media, index) => (
                <div
                  key={index}
                  className={styles.album}
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
            
            {album.media
              .filter((media) => media.orientation === "portrait")
              .map((media, index) => (
                <div
                  key={index}
                  className={styles.album}
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
          </Masonry>
        </ResponsiveMasonry>
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
