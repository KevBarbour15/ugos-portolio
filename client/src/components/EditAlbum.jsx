import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/EditAlbum.module.css";

const EditAlbum = () => {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      const response = await axios.get("/albums");
      setAlbums(response.data);
    };

    fetchAlbums();
  }, []);

  useEffect(() => {
    if (selectedAlbum) {
      setTitle(selectedAlbum.title);
      setDescription(selectedAlbum.description);
      setCoverImage(selectedAlbum.coverImage);

      const fetchMedia = async () => {
        const response = await axios.get(`/albums/${selectedAlbum._id}`);
        setMedia(response.data.media);
      };

      fetchMedia();
    }
  }, [selectedAlbum]);

  const handleSelectAlbum = (event) => {
    const albumId = event.target.value;
    const album = albums.find((album) => album._id === albumId);
    setSelectedAlbum(album);
  };

  const handleUpdateTitle = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.put(
        `/albums/${selectedAlbum._id}`,
        {
          title: title,
        },
        config
      );

      if (response.status === 200) {
        console.log("Title updated successfully!");
        setSelectedAlbum(response.data);
      }
    } catch (error) {
      console.error("Failed to update title", error);
    }
  };

  const handleUpdateDescription = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.put(
        `/albums/${selectedAlbum._id}`,
        {
          description: description,
        },
        config
      );

      if (response.status === 200) {
        console.log("Description updated successfully!");
        setSelectedAlbum(response.data);
      }
    } catch (error) {
      console.error("Failed to update description", error);
    }
  };

  const handleUpdateCoverImage = async (e) => {
    e.preventDefault();

    try {
      console.log(`Updating albumCover with id: ${coverImage}`);

      // Get the token from wherever you're storing it (localStorage, context, etc.)
      const token = localStorage.getItem("token");

      // Add it to the headers of your request
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.put(
        `/albums/${selectedAlbum._id}`,
        {
          albumCover: coverImage,
        },
        config
      ); // Don't forget to pass the config to the request

      console.log("response: ", response);
      if (response.status === 200) {
        console.log("Cover image updated successfully!");
        // Here you can do something with the updated album data, e.g. update the state
        // setAlbum(response.data);
      }
    } catch (error) {
      console.error("Failed to update cover image", error);
    }
  };

  const handleDeleteAlbum = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this album?"
    );
    if (!confirmation) return;

    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.delete(
        `/albums/${selectedAlbum._id}`,
        config
      );

      if (response.status === 200) {
        console.log("Album deleted successfully!");
        // Remove the deleted album from the state
        setAlbums(albums.filter((album) => album._id !== selectedAlbum._id));
        // Clear the selected album
        setSelectedAlbum(null);
        setTitle("");
        setDescription("");
        setCoverImage("");
        setMedia([]);
      }
    } catch (error) {
      console.error("Failed to delete album", error);
    }
  };

  return (
    <div className={styles.container}>
      <select onChange={handleSelectAlbum} className={styles.select}>
        <option>Select an album...</option>
        {albums.map((album) => (
          <option key={album._id} value={album._id}>
            {album.title}
          </option>
        ))}
      </select>

      <form onSubmit={handleUpdateTitle} className={styles.formContainer}>
        <label className={styles.label}>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Update Title
        </button>
      </form>

      <form onSubmit={handleUpdateDescription} className={styles.formContainer}>
        <label className={styles.label}>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
        />
        <button type="submit" className={styles.button}>
          Update Description
        </button>
      </form>

      <form onSubmit={handleUpdateCoverImage} className={styles.formContainer}>
        <label className={styles.label}>Cover Image:</label>
        <div className="image-selector">
          {media.map((m) => (
            <img
              key={m._id}
              src={m.url}
              alt="thumbnail"
              style={{
                height: "50px",
                margin: "5px",
                border: coverImage === m._id ? "2px solid red" : "none",
              }}
              onClick={() => setCoverImage(m._id)}
              className={styles.thumbnail}
            />
          ))}
        </div>
        <button type="submit" className={styles.button}>
          Update Cover Image
        </button>
      </form>

      <button
        onClick={handleDeleteAlbum}
        className={`${styles.button} ${styles.buttonDanger}`}
      >
        Delete Album
      </button>
    </div>
  );
};

export default EditAlbum;
