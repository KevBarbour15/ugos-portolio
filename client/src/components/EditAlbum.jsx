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

  const scrollLeft = () => {
    imageContainerRef.current.scrollBy({ left: -100, behavior: "smooth" });
  };

  const scrollRight = () => {
    imageContainerRef.current.scrollBy({ left: 100, behavior: "smooth" });
  };

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
    <div className={styles.albumEditContainer}>
      <select onChange={handleSelectAlbum} className={styles.albumEditSelect}>
        <option>Select an album...</option>
        {albums.map((album) => (
          <option key={album._id} value={album._id}>
            {album.title}
          </option>
        ))}
      </select>

      <form onSubmit={handleUpdateTitle} className={styles.albumEditForm}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.albumEditInput}
        />
        <button type="submit" className={styles.albumEditButton}>
          Update Title
        </button>
      </form>

      <form onSubmit={handleUpdateDescription} className={styles.albumEditForm}>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.albumEditTextarea}
        />
        <button type="submit" className={styles.albumEditButton}>
          Update Description
        </button>
      </form>

      <form onSubmit={handleUpdateCoverImage} className={styles.albumEditForm}>
        <label>Cover Image:</label>
        <div className={styles.albumEditImageSelector} ref={imageContainerRef}>
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
              className={styles.albumEditImage}
            />
          ))}
        </div>
        <button type="submit" className={styles.albumEditButton}>
          Update Cover Image
        </button>
      </form>

      <button onClick={handleDeleteAlbum} className={styles.albumEditButton}>
        Delete Album
      </button>
    </div>
  );
};

export default EditAlbum;
