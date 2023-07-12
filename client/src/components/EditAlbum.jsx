import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "../styles/EditAlbum.module.css";

const EditAlbum = () => {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [media, setMedia] = useState([]);
  const imageContainerRef = useRef(null);

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
      const token = localStorage.getItem("token");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.put(
        `/albums/${selectedAlbum._id}`,
        {
          albumCover: coverImage,
        },
        config
      );

      console.log("response: ", response);
      if (response.status === 200) {
        console.log("Cover image updated successfully!");
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
        setAlbums(albums.filter((album) => album._id !== selectedAlbum._id));
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

  const handleDeleteImage = () => {
    // Remove the image from the album's media array.
    /* const newMedia = media.filter((m) => m._id !== selectedImage);
    setMedia(newMedia);*/
    // TODO: Delete the image on the server. This depends on how you are storing your images.
  };

  return (
    <div className={styles.editContainer}>
      <div className={styles.selectContainer}>
        <select onChange={handleSelectAlbum} className={styles.editSelect}>
          <option>Select an album to edit...</option>
          {albums.map((album) => (
            <option key={album._id} value={album._id}>
              {album.title}
            </option>
          ))}
        </select>
      </div>
      <form onSubmit={handleUpdateTitle} className={styles.editForm}>
        <label className={styles.editLabel}>Album Title:</label>
        <input
          className={styles.editInput}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className={styles.formButton} type="submit">
          Update Title
        </button>
      </form>

      <form onSubmit={handleUpdateDescription} className={styles.editForm}>
        <label className={styles.editLabel}>Album Description:</label>
        <textarea
          className={styles.editInput}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className={styles.formButton} type="submit">
          Update Description
        </button>
      </form>

      <form onSubmit={handleUpdateCoverImage} className={styles.editForm}>
        <label className={styles.editLabel}>Cover Image:</label>
        <div className={styles.imageContainer}>
          {media.map((m) => (
            <img
              key={m._id}
              src={m.url}
              alt="thumbnail"
              style={{
                height: "75px",
                margin: "5px",
                border: coverImage === m._id ? "2px solid red" : "none",
              }}
              onClick={() => setCoverImage(m._id)}
            />
          ))}
        </div>
        <button className={styles.formButton} type="submit">
          Update Cover Image
        </button>
      </form>

      <form className={styles.editForm}>
        <label className={styles.editLabel}>Delete Image from Album:</label>
        <div className={styles.imageContainer}>
          {media.map((m) => (
            <img
              key={m._id}
              src={m.url}
              alt="thumbnail"
              style={{
                height: "75px",
                margin: "5px",
                //border: selectedImage === m._id ? "2px solid red" : "none",
              }}
              onClick={() => setSelectedImage(m._id)}
            />
          ))}
        </div>
        <button className={styles.formButton} onClick={handleDeleteImage}>
          Delete Image
        </button>
      </form>
      <div className={styles.selectContainer}>
        <button className={styles.deleteButton} onClick={handleDeleteAlbum}>
          Delete Album
        </button>
      </div>
    </div>
  );
};

export default EditAlbum;
