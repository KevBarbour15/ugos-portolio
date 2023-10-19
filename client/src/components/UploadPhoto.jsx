import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Dashboard.module.scss";
import { imageSuccessNotification } from "../helpers/notifications";

function UploadPhoto() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchAlbums = async () => {
      const res = await axios.get("/albums");
      const photoAlbums = res.data.filter((album) => album.photo === true);
      setAlbums(photoAlbums);
    };

    fetchAlbums();

    return () => {
      setSelectedAlbum("");
    };
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }
    setFile(file);
  };

  const handleSelectChange = (e) => {
    setSelectedAlbum(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedAlbum || selectedAlbum === "") {
      alert("Please select an album before uploading a photo.");
      return;
    }

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

    setProgress(50);

    try {
      const res = await axios.post("/media/upload", data, config);

      setProgress(100);
      imageSuccessNotification("Successfully uploaded photo.", null);
      setTimeout(() => {
        setProgress(0);
      }, 1500);
    } catch (error) {
      console.error(
        "An error occurred while uploading the file. Error: ",
        error
      );
      setProgress(0);
    }
  };

  return (
    <div className={styles.dashContainer}>
      <form className={styles.dashForm} onSubmit={handleSubmit}>
        <label className={styles.dashLabel}>select album to upload to:</label>
        <select
          id="album"
          value={selectedAlbum}
          onChange={handleSelectChange}
          className={styles.dashSelect}
        >
          <option value="" disabled>
            no album selected
          </option>
          {albums.map((album) => (
            <option value={album._id} key={album._id}>
              {album.title}
            </option>
          ))}
        </select>

        <label htmlFor="photo" className={styles.dashLabel}>
          select photo to upload:
        </label>
        <input
          className={styles.dashUploadInput}
          type="file"
          id="media"
          onChange={handleFileChange}
          accept="image/*"
        />

        <ProgressBar
          className={styles.progressBar}
          now={progress}
          placeholder="upload progress"
          label={`${progress}%`}
          srOnly
          variant="danger"
        />

        <button type="submit" className={styles.dashButton}>
          <span>upload photo</span>
        </button>
      </form>
    </div>
  );
}

export default UploadPhoto;
