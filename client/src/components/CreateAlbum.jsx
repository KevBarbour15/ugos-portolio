import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/CreateAlbum.module.css";

const CreateAlbum = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedOption, setSelectedOption] = useState("photo");

  const onSubmit = async (e) => {
    e.preventDefault();

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
      setSelectedOption("photo");
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
        <div className={styles.photoVideoSwitch}>
          <span className={styles.labelText}>photo</span>
          <input
            id="photoVideoSwitch"
            type="checkbox"
            checked={selectedOption === "video"}
            onChange={() =>
              setSelectedOption((prev) =>
                prev === "photo" ? "video" : "photo"
              )
            }
          />
          <label
            htmlFor="photoVideoSwitch"
            className={styles.switchLabel}
          ></label>
          <span className={styles.labelText}>video</span>
        </div>

        <div className={styles.inputWrapper}>
          <input
            className={styles.createAlbumField}
            id="albumTitle"
            type="text"
            placeholder="album title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label className={styles.createAlbumLabel} htmlFor="albumTitle">
            album title
          </label>
        </div>

        <div className={styles.inputWrapper}>
          <input
            className={styles.createAlbumField}
            id="albumDescription"
            placeholder="album description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className={styles.createAlbumLabel} htmlFor="albumDescription">
            album description
          </label>
        </div>

        <button className={styles.createAlbumButton} type="submit">
          <span>create album</span>
        </button>
      </form>
    </div>
  );
};

export default CreateAlbum;
