import { useEffect, useState, useRef } from "react";
import axios from "../../axiosConfig";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import styles from "./AlbumDetails.module.scss";
import useFadeIn from "../../animations/useFadeIn";
import MoonLoader from "react-spinners/MoonLoader";

const PhotoAlbumDetails = ({ id }) => {
  const [album, setAlbum] = useState("");
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [minLoadTimePassed, setMinLoadTimePassed] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const shouldDisplayLoading = isLoading || !minLoadTimePassed;
  const minLoadingTime = 250;

  const headerRef = useRef(null);
  const bodyRef = useRef(null);

  useFadeIn(shouldAnimate, headerRef, 0.25, 0.75, 25);
  useFadeIn(shouldAnimate, bodyRef, 0.5, 0.75, 25);

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

      const media = preloadedImages.map((img, index) => {
        return {
          ...albumData.media[index],
          url: img.src,
        };
      });

      setAlbum({ ...albumData, media: media });
    } catch (error) {
      console.error("Could not fetch album", error);
    }
  };

  useEffect(() => {
    // load the album
    fetchAlbum();

    if (album) {
      setIsLoading(false);
      setTimeout(() => {
        setMinLoadTimePassed(true);
        setShouldAnimate(true);
      }, minLoadingTime);
    }
  }, [album, headerRef]);

  return (
    <div className={styles.container}>
      {shouldDisplayLoading ? (
        <div className={styles.loadingContainer}>
          <MoonLoader
            color={"black"}
            loading={true}
            size={75}
            speedMultiplier={0.75}
          />
        </div>
      ) : (
        <>
          <div ref={headerRef} className={styles.albumHeader}>
            <div className={styles.albumInfoWrapper}>
              <h2 className={styles.albumTitle}>
                {"collection " + album?.title}
              </h2>
              <p className={styles.albumInfo}>{album?.description}</p>
            </div>
          </div>
          <div ref={bodyRef} className={styles.mediaContainer}>
            {album.media.map((media, index) => (
              <div
                key={index}
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
        </>
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
