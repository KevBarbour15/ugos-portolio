import React, { useEffect, useState } from "react";
import axios from "axios";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import styles from "../styles/AlbumDetails.module.css";

const AlbumDetails = ({ id }) => {
  const [album, setAlbum] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

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
        <>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry gutter="20px">
              {album.media.map((media, index) => (
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
        </>
      ) : (
        <p>No media in this album.</p>
      )}
    </div>
  );
};

export default AlbumDetails;
