import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../pages/Dashboard/Dashboard.module.scss";
import { toast } from "react-toastify";

function EditLanding() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [landingVideos, setLandingVideos] = useState([]);
  const [isRandom, setIsRandom] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [toDeleteVideo, setToDeleteVideo] = useState(null);

  useEffect(() => {
    fetchLandingVideos();
  }, []);

  const fetchLandingVideos = async () => {
    const res = await axios.get("/landing/videos");

    setLandingVideos(res.data.videos);
    setIsRandom(res.data.random);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith("video/")) {
      toast.error("Please upload a video file.");
      return;
    }
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a video to upload.");
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
      setProgress(50);
      const res = await axios.post("/landing/upload", data, config);

      console.log("File uploaded successfully. Response: ", res.data);
      setProgress(100);

      toast.success("Successfully uploaded video.");
      setTimeout(() => {
        setProgress(0);
      }, 1000);
      fetchLandingVideos();
    } catch (error) {
      console.error(
        "An error occurred while uploading the file. Error: ",
        error
      );
      setProgress(0);
    }
  };

  const handleSetCurrentVideo = async (e) => {
    e.preventDefault();

    if (!selectedVideo) {
      toast.error("Please select a video to set as current.");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "/landing/setCurrent",
        {
          current: selectedVideo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Successfully set current video.");

      setSelectedVideo(null);
      fetchLandingVideos();
    } catch (error) {
      toast.error("Error setting current video.");
    }
  };

  const handleToggleRandom = async () => {
    const newRandomState = !isRandom;
    const token = localStorage.getItem("token");
    try {
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

      if (response.data && typeof response.data.random === "boolean") {
        setIsRandom(response.data.random);
      } else {
        console.error("Unexpected response format from server.");
      }
    } catch (error) {
      console.error("Error setting random mode:", error);
    }
  };

  const handleDeleteVideo = async (e) => {
    e.preventDefault();

    if (!toDeleteVideo) {
      toast.error("Please select a video to delete.");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "/landing/delete",
        { toDeleteVideo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Successfully deleted video.");
      setToDeleteVideo(null);
      fetchLandingVideos();
    } catch (error) {
      console.log("Error deleting video: ", error);
      toast.error("Error deleting video.");
    }
  };

  return (
    <div className={styles.dashContainer}>
      <div className={styles.photoVideoSwitch}>
        <span className={styles.labelText}>current</span>
        <input
          id="randomSwitch"
          type="checkbox"
          checked={isRandom}
          onChange={handleToggleRandom}
        />
        <label htmlFor="randomSwitch" className={styles.switchLabel}></label>
        <span className={styles.labelText}>random</span>
      </div>

      <form className={styles.dashForm}>
        <div className={styles.inputWrapper}>
          <label className={styles.dashLabel}>
            set current landing page video:
          </label>
        </div>

        <div className={styles.dashImageContainer}>
          {landingVideos.map((video) => (
            <video
              key={video}
              src={video}
              autoPlay
              loop
              muted
              style={{
                margin: "1px",
                border: selectedVideo === video ? "3px solid green" : "none",
              }}
              onClick={() => setSelectedVideo(video)}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.dashButton}
          onClick={handleSetCurrentVideo}
        >
          <span>set as current</span>
        </button>

        <div className={styles.inputWrapper}>
          <label className={styles.dashLabel}>delete landing page video:</label>
        </div>

        <div className={styles.dashImageContainer}>
          {landingVideos.map((video) => (
            <video
              key={video}
              src={video}
              loop
              muted
              style={{
                margin: "1px",
                border: toDeleteVideo === video ? "3px solid red" : "none",
              }}
              onClick={() => setToDeleteVideo(video)}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.dashButton}
          onClick={handleDeleteVideo}
        >
          <span>delete video</span>
        </button>
      </form>

      <form className={styles.dashForm} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <label htmlFor="video" className={styles.dashLabel}>
            upload new video for landing page:
          </label>
        </div>

        <input
          className={styles.dashUploadInput}
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

        <button type="submit" className={styles.dashButton}>
          <span>upload video</span>
        </button>
      </form>
    </div>
  );
}

export default EditLanding;
