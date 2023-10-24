import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/Landing.module.scss";
import { Link } from "react-router-dom";
import axios from "../axiosConfig";
import defaultLandingVideo from "../videos/landingSmall.mp4";

const Landing = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchLandingVideo = async () => {
      try {
        const res = await axios.get("/landing/videos");
        const videos = res.data.videos;
        const isRandom = res.data.random;
        const currentVideo = res.data.current;

        if (videos && videos.length) {
          if (isRandom) {
            const randomIndex = Math.floor(Math.random() * videos.length);
            setVideoUrl(videos[randomIndex]);
          } else {
            setVideoUrl(currentVideo);
          }
        } else {
          setVideoUrl(defaultLandingVideo);
        }
      } catch (error) {
        console.error("Error fetching landing video:", error);
        setVideoUrl(defaultLandingVideo);
      } finally {
        setLoading(false);
      }
    };

    fetchLandingVideo();
  }, []);

  useEffect(() => {
    if (!loading && videoRef.current) {
      videoRef.current.play();
    }
  }, [loading]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={styles.landingContainer}>
      <video ref={videoRef} autoPlay muted loop className={styles.video}>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className={styles.landingButtonEnter}>
        <Link to="Home" className={styles.landingLink}>
          <span className={styles.landingText}>enter</span>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
