import React, { useState, useEffect } from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/UploadPhoto.module.css";

function UploadVideo() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchAlbums = async () => {
      const res = await axios.get("/albums");
      const photoAlbums = res.data.filter((album) => album.photo === false);
      setAlbums(photoAlbums);
    };

    fetchAlbums();

    return () => {
      setSelectedAlbum("");
    };
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const validTypes = ["video/mp4", "video/webm", "video/ogg"];
    if (validTypes.includes(file.type)) {
      setFile(file);
    } else {
      alert("Invalid video type. Please upload a valid video file.");
    }
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

          select album to upload to:

        </label>
        <select
          id="album"
          value={selectedAlbum}
          onChange={handleSelectChange}
          className={styles.uploadSelect}
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
        <label htmlFor="media" className={styles.uploadLabel}>
          select video to upload:

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

          <span>upload video</span>

        </button>
      </form>
    </div>
  );
}

export default UploadVideo;
