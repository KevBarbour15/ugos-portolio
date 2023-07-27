import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/CreateAlbum.module.css";

const CreateAlbum = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (selectedOption === null) {
      alert("Please select either Photo or Video.");
      return;
    }

    title.toLowerCase();
    const album = {
      title,
      description,
      photo: selectedOption === "photo",
    };

    try {
      const response = await axios.post("/albums", album, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setTitle("");
      setDescription("");
      setSelectedOption(null);
      alert("Album successfully created!");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data);
      } else {
        console.error(error);
        alert("An error occurred while trying to create the album.");
      }
    }
  };

  return (
    <div className={styles.createAlbumContainer}>
      <form className={styles.createAlbumForm} onSubmit={onSubmit}>
        <input
          className={styles.createAlbumInput}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Album Title:"
          required
        />

        <textarea
          className={styles.createAlbumText}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Album Description:"
        />

        <div className={styles.createAlbumSwitch}>
          <label>
            <input
              type="radio"
              value="photo"
              checked={selectedOption === "photo"}
              onChange={() => setSelectedOption("photo")}
              required
            />
            Photo
          </label>
          <label>
            <input
              type="radio"
              value="video"
              checked={selectedOption === "video"}
              onChange={() => setSelectedOption("video")}
              required
            />
            Video
          </label>
        </div>

        <button className={styles.createAlbumButton} type="submit">
          Create Album
        </button>
      </form>
    </div>
  );
};

export default CreateAlbum;
