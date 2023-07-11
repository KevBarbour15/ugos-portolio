import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/CreateAlbum.module.css";

const CreateAlbum = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    title.toLowerCase();
    const album = {
      title,
      description,
    };

    try {
      const response = await axios.post("/albums", album, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setTitle("");
      setDescription("");
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
          required
        />

        <button className={styles.createAlbumButton} type="submit">
          Create Album
        </button>
      </form>
    </div>
  );
};

export default CreateAlbum;
