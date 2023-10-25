import React, { useState, useEffect } from "react";
import styles from "../styles/Landing.module.scss";
import { Link } from "react-router-dom";
import axios from "../axiosConfig";
import defaultLandingVideo from "../videos/landingSmall.mp4";
import defaultLandingImage from "../images/bridge.jpg";

const Landing = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
            console.log("Random video picked.");
            setVideoUrl(videos[randomIndex]);
          } else {
            console.log("Current video picked.");
            setVideoUrl(currentVideo);
          }
        } else {
          console.log("No landing videos found.");
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

  return (
    <div className={styles.landingContainer}>
      {isMobile ? (
        <img src={defaultLandingImage} alt="Landing" className={styles.image} />
      ) : (
        <video autoPlay muted loop playsInline className={styles.video}>
          <source src={videoUrl} />
          Your browser does not support the video tag.
        </video>
      )}

      <div className={styles.landingButtonEnter}>
        <Link to="Home" className={styles.landingLink}>
          <span className={styles.landingText}>enter</span>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
