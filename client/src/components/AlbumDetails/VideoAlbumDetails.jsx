import { useEffect, useState, useRef } from "react";
import axios from "../../axiosConfig";
import ReactPlayer from "react-player";
import styles from "./AlbumDetails.module.scss";
import isVideo from "../../helpers/video";

// Animation imports
import useFadeIn from "../../animations/useFadeIn";
import useAnimateImages from "../../animations/useAnimateImages";
import useScramble from "../../animations/useScramble";

// Loader imports
import MoonLoader from "react-spinners/MoonLoader";

const VideoAlbumDetails = ({ id }) => {
  const [album, setAlbum] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [minLoadTimePassed, setMinLoadTimePassed] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [videosReadyCount, setVideosReadyCount] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const minLoadingTime = 250;

  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const infoRef = useRef(null);
  const bodyRef = useRef(null);
  const galleryVideosRef = useRef([]);

  useFadeIn(shouldAnimate, headerRef, 0.25, 0.5, 0);
  useScramble(shouldAnimate, titleRef, 0.75, 1.25, title);
  useScramble(shouldAnimate, infoRef, 0.75, 1.25, description);
  useFadeIn(shouldAnimate, bodyRef, 0.5, 0.5, 0);
  useAnimateImages(shouldAnimate, galleryVideosRef);

  const fetchAlbum = async () => {
    try {
      const response = await axios.get(`/albums/${id}`);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setAlbum(response.data);
    } catch (error) {
      console.error("Could not fetch album", error);
    } finally {
      setTimeout(() => {
        setMinLoadTimePassed(true);
      }, minLoadingTime);
    }
  };

  useEffect(() => {
    fetchAlbum();
  }, [id]);

  useEffect(() => {
    if (minLoadTimePassed && videosReadyCount === album?.media.length) {
      setIsLoading(false);
      setShouldAnimate(true);
    }
  }, [minLoadTimePassed, videosReadyCount, album]);

  const videoComponent = (media, index) => (
    <div
      ref={(el) => (galleryVideosRef.current[index] = el)}
      key={index}
      className={styles.galleryImage}
    >
      <ReactPlayer
        url={media.url}
        controls={true}
        playing={true}
        muted
        width="100%"
        height="auto"
        margin="0"
        onReady={() => setVideosReadyCount((prev) => prev + 1)}
      />
    </div>
  );

  return (
    <div className={styles.container}>
      {isLoading && (
        <div className={styles.loadingContainer}>
          <MoonLoader
            color={"black"}
            loading={true}
            size={75}
            speedMultiplier={0.5}
          />
        </div>
      )}

      {album && (
        <>
          <div ref={headerRef} className={styles.albumHeader}>
            <div className={styles.albumInfoWrapper}>
              <h2 ref={titleRef} className={styles.albumTitle}>
                {title}
              </h2>
              <p ref={infoRef} className={styles.albumInfo}>
                {description}
              </p>
            </div>
          </div>
          <div ref={bodyRef} className={styles.mediaContainer}>
            {album?.media && album.media.length > 0 ? (
              album?.media.map((media, index) =>
                isVideo(media.url) ? (
                  videoComponent(media, index)
                ) : (
                  <img src={media.url} alt="" key={index} />
                )
              )
            ) : (
              <div>No media available</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default VideoAlbumDetails;
