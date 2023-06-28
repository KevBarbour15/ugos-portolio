import React, { useState, useEffect } from "react";
import axios from "axios";

function UploadPhoto() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      const res = await axios.get("/albums");
      setAlbums(res.data);
    };

    fetchAlbums();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSelectChange = (e) => {
    setSelectedAlbum(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("album", selectedAlbum);

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        // Pass the token as a Bearer token in Authorization header
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.post("/media/upload", data, config);

      console.log("File uploaded successfully. Response: ", res.data);
    } catch (error) {
      console.error(
        "An error occurred while uploading the file. Error: ",
        error
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Upload Photo</h1>
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
  );
}

export default UploadPhoto;
