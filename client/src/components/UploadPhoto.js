import React, { useState, useEffect } from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./UploadPhoto.module.css";

function UploadPhoto() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchAlbums = async () => {
      const res = await axios.get("/albums");
      setAlbums(res.data);
      if (res.data.length > 0) {
        setSelectedAlbum(res.data[0]._id);
      }
    };

    fetchAlbums();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSelectChange = (e) => {
    setSelectedAlbum(e.target.value);
  };

  /// Thing to do:
  /// 1. File Validation
  /// 2. File Size Limit
  /// 3. Server-Side Validation - currently, the server will accept any file type, we need to everntually restrict this to only accept images

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedAlbum) {
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
    <div className={styles.container}>
      <div className={styles.uploadArea}>
        <ProgressBar
          className={styles.progressBarCustom}
          now={progress}
          label={`${progress}%`}
          srOnly
          striped
          variant="info"
        />
        <form onSubmit={handleSubmit}>
          <label>
            Select Album:
            <select value={selectedAlbum} onChange={handleSelectChange}>
              {albums.map((album) => (
                <option value={album._id} key={album._id}>
                  {album.title}
                </option>
              ))}
            </select>
          </label>
          <label>
            Select Photo:
            <input type="file" onChange={handleFileChange} />
          </label>
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}

export default UploadPhoto;
