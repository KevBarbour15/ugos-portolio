import React, { useState, useEffect } from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/UploadPhoto.module.css";

function UploadPhoto() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchAlbums = async () => {
      const res = await axios.get("/albums");
      const photoAlbums = res.data.filter(album => album.photo === false);
      setAlbums(photoAlbums);
    };

    fetchAlbums();

    return () => {
      setSelectedAlbum("");  
    };
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("video/")) {
      alert("Please upload a video file");
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
      alert("Please select an album before uploading a video.");
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

    setProgress(30);

    try {
      const res = await axios.post("/media/upload", data, config);

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

  return (
    <div className={styles.uploadContainer}>
      <form className={styles.uploadForm} onSubmit={handleSubmit}>
        <label htmlFor="album" className={styles.uploadLabel}>
          Select Album To Upload To:
        </label>
        <select
          id="album"
          value={selectedAlbum}
          onChange={handleSelectChange}
          className={styles.uploadSelect}
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

        <label htmlFor="photo" className={styles.uploadLabel}>
          Select Photo To Upload:
        </label>
        <input
          className={styles.uploadInput}
          type="file"
          id="media"
          onChange={handleFileChange}
          accept="video/*"
        />

        <ProgressBar
          className={styles.progressBar}
          now={progress}
          placeholder="Upload Progress"
          label={`${progress}%`}
          srOnly
          striped
          variant="info"
        />

        <button type="submit" className={styles.uploadButton}>
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadPhoto;
