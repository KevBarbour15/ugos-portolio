import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Dashboard.module.scss";
import {
  imageSuccessNotification,
  errorNotification,
} from "../helpers/notifications";

function UploadMedia() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isPhoto, setIsPhoto] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      const res = await axios.get("/albums");
      const filteredAlbums = res.data.filter(
        (album) => album.photo === isPhoto
      );
      setAlbums(filteredAlbums);
    };
    fetchAlbums();
    return () => {
      setSelectedAlbum("");
    };
  }, [isPhoto]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (isPhoto) {
      if (!file.type.startsWith("image/")) {
        errorNotification("Please upload an image file.", null);
        return;
      }
    } else {
      const validTypes = [
        "video/mp4",
        "video/webm",
        "video/ogg",
        "video/quicktime",
      ];
      if (!validTypes.includes(file.type)) {
        errorNotification(
          "Invalid video type. Please upload a valid video file.",
          null
        );
        return;
      }
    }
    setFile(file);
  };

  const handleSelectChange = (e) => {
    setSelectedAlbum(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", file);
    data.append("album", selectedAlbum);

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    console.log(data.get('album'));

    setProgress(50);
    try {
      const res = await axios.post("/media/upload", data, config);
      if (isPhoto) {
        imageSuccessNotification("Successfully uploaded photo.", null);
      } else {
        imageSuccessNotification("Successfully uploaded video.", null);
      }
      setProgress(100);
      setTimeout(() => {
        setProgress(0);
        setFile(null);
      }, 1500);
    } catch (error) {
      errorNotification("An error occurred while uploading the file.", null);
      console.error(
        `An error occurred while uploading the file. Error: `,
        error
      );
      setProgress(0);
    }
  };

  return (
    <div className={styles.dashContainer}>
      <div className={styles.photoVideoSwitch}>
        <span className={styles.labelText}>photo</span>
        <input
          id="photoVideoSwitch"
          type="checkbox"
          checked={!isPhoto}
          onChange={() => setIsPhoto((prev) => !prev)}
        />
        <label
          htmlFor="photoVideoSwitch"
          className={styles.switchLabel}
        ></label>
        <span className={styles.labelText}>video</span>
      </div>

      <form className={styles.dashForm} onSubmit={handleSubmit}>
        <label className={styles.dashLabel}>Select album to upload to:</label>
        <select
          id="album"
          value={selectedAlbum}
          onChange={handleSelectChange}
          className={styles.dashSelect}
        >
          <option value="" disabled>
            No album selected
          </option>
          {albums.map((album) => (
            <option value={album._id} key={album._id}>
              {album.title}
            </option>
          ))}
        </select>

        <label htmlFor="media" className={styles.dashLabel}>
          Select {isPhoto ? "photo" : "video"}:
        </label>
        <input
          className={styles.dashUploadInput}
          type="file"
          id="media"
          onChange={handleFileChange}
          accept={isPhoto ? "image/*" : "video/*"}
        />

        <ProgressBar
          className={styles.progressBar}
          now={progress}
          placeholder={
            isPhoto ? "Upload photo progress" : "Upload video progress"
          }
          label={`${progress}%`}
          srOnly
          striped
          variant={isPhoto ? "danger" : "info"}
        />

        <button type="submit" className={styles.dashButton}>
          <span>Upload</span>
        </button>
      </form>
    </div>
  );
}

export default UploadMedia;
