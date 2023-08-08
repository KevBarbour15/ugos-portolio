import React, { useState, useEffect } from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/EditLanding.module.css";

function EditLanding() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [landingVideos, setLandingVideos] = useState([]);
  const [isRandom, setIsRandom] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchLandingVideos();
  }, []);

  const fetchLandingVideos = async () => {
    console.log("fetching landing videos");
    const res = await axios.get("/landing/videos");
    console.log("res.data: ", res.data);
    setLandingVideos(res.data.videos);
    setIsRandom(res.data.random);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith("video/")) {
      alert("Please upload a video file");
      return;
    }
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a video before uploading.");
      return;
    }
    const data = new FormData();
    data.append("video", file);

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    setProgress(30);

    try {
      const res = await axios.post("/landing/upload", data, config);

      console.log("File uploaded successfully. Response: ", res.data);
      setProgress(100);

      setTimeout(() => {
        setProgress(0);
      }, 1000);
    } catch (error) {
      console.error(
        "An error occurred while uploading the file. Error: ",
        error
      );
      setProgress(0);
    }
  };

  const handleSetCurrentVideo = async (e, videoUrl) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "/landing/setCurrent",
        {
          current: videoUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchLandingVideos();
    } catch (error) {
      console.error("Error setting current video:", error);
    }
  };

  const handleToggleRandom = async () => {
    console.log("Switch clicked");
    const newRandomState = !isRandom;
    console.log("New random state:", newRandomState);
    const token = localStorage.getItem("token");

    try {
      console.log("Sending request to server");
      const response = await axios.post(
        "/landing/setRandom",
        {
          random: newRandomState,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Server Response:", response.data);

      if (response.data && typeof response.data.random === "boolean") {
        setIsRandom(response.data.random);
      } else {
        console.error("Unexpected response format from server.");
      }
    } catch (error) {
      console.error("Error setting random mode:", error);
    }
  };

  const handleVideoClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  return (
    <div className={styles.editLandingContainer}>
      <div className={styles.randomSwitch}>
        <span className={styles.labelText}>random video disabled</span>

        <input
          id="randomSwitch"
          type="checkbox"
          checked={isRandom}
          onChange={handleToggleRandom}
        />

        <label htmlFor="randomSwitch" className={styles.switchLabel}></label>

        <span className={styles.labelText}>random video enabled</span>
      </div>

      <form className={styles.editLandingForm}>
        <div className={styles.inputWrapper}>
          <label className={styles.editLandingLabel}>
            set current landing page video:
          </label>
        </div>

        <div className={styles.videoContainer}>
          {landingVideos.map((video) => (
            <video
              key={video}
              src={video}
              autoPlay
              loop
              muted
              style={{
                margin: "1px",
                border: selectedVideo === video ? "4px solid red" : "none",
              }}
              onClick={() => handleVideoClick(video)}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.editLandingButton}
          onClick={(e) => handleSetCurrentVideo(e, selectedVideo)}
        >
          <span>set as current</span>
        </button>
      </form>

      <form className={styles.editLandingForm} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <label htmlFor="video" className={styles.editLandingLabel}>
            upload new video for landing page:
          </label>
        </div>

        <input
          className={styles.editLandingInput}
          type="file"
          id="video"
          onChange={handleFileChange}
          accept="video/*"
        />

        <ProgressBar
          className={styles.progressBar}
          now={progress}
          label={`${progress}%`}
        />

        <button type="submit" className={styles.editLandingButton}>
          <span>upload video</span>
        </button>
      </form>
    </div>
  );
}

export default EditLanding;
