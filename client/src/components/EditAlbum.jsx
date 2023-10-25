import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import styles from "../styles/Dashboard.module.scss";
import isVideo from "../helpers/video";
import { toast } from "react-toastify";

// TO:DO we need to fix when we delete an image, we need to check if it is the cover image, and if so replace it with next image

const EditAlbum = () => {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [media, setMedia] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedCover, setSelectedCover] = useState("");
  const [selectedUrl, setSelectedUrl] = useState("");

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
        const res = await axios.get(`/albums/${selectedAlbum._id}`);
        setMedia(res.data.media);
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

    if (!selectedAlbum) {
      toast.error("No album selected.");
      return;
    }

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
        setSelectedAlbum(response.data);
        toast.success("Title updated successfully.");
      }
    } catch (error) {
      console.error("Failed to update title", error);
      toast.error("Failed to update title.");
    }
  };

  const handleUpdateDescription = async (e) => {
    e.preventDefault();

    if (!selectedAlbum) {
      toast.error("No album selected.");
      return;
    }

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
        setSelectedAlbum(response.data);
        toast.success("Description updated successfully.");
      }
    } catch (error) {
      toast.error("Failed to update description.");
    }
  };

  const handleUpdateCoverImage = async (e) => {
    e.preventDefault();

    if (!selectedAlbum) {
      toast.error("No album selected.");
      return;
    }

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
        toast.success("Cover image updated successfully.");
      }
    } catch (error) {
      toast.error("Failed to update cover image.");
    }
  };

  const handleDeleteAlbum = async (e) => {
    e.preventDefault();

    if (!selectedAlbum) {
      toast.error("No album selected.");
      return;
    }

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
        toast.success("Album deleted successfully.");
        setAlbums(albums.filter((album) => album._id !== selectedAlbum._id));
        setSelectedAlbum(null);
        setTitle("");
        setDescription("");
        setCoverImage("");
        setMedia([]);
        setSelectedCover("");
        setSelectedUrl("");
      }
    } catch (error) {
      toast.error("Failed to delete album.");
    }
  };

  const handleDeleteImage = async (e) => {
    e.preventDefault();

    if (!selectedAlbum) {
      toast.error("No album selected.");
      return;
    }

    if (!selectedImage) {
      toast.error("No image selected.");
      return;
    }

    const confirmation = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmation) return;

    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.delete(
        `/albums/${selectedAlbum._id}/media/${selectedImage}`,
        config
      );

      if (response.status === 200) {
        toast.success("Image deleted successfully.");
        setMedia(media.filter((m) => m._id !== selectedImage));
        setSelectedImage("");
      }
    } catch (error) {
      console.error("Server response status", error.response.status);
    }
  };

  return (
    <div className={styles.dashContainer}>
      <form onSubmit={handleUpdateTitle} className={styles.dashForm}>
        <label className={styles.dashLabel}>select album to edit:</label>
        <select onChange={handleSelectAlbum} className={styles.dashSelect}>
          <option>no album selected...</option>
          {albums.map((album) => (
            <option key={album._id} value={album._id}>
              {album.title}
            </option>
          ))}
        </select>
        <div className={styles.inputWrapper}>
          <input
            className={styles.dashInputField}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder=" "
          />
          <label className={styles.dashInputLabel} htmlFor="albumTitle">
            title:
          </label>
        </div>
        <button className={styles.dashButton} type="submit">
          <span>edit title</span>
        </button>
      </form>

      <form onSubmit={handleUpdateDescription} className={styles.dashForm}>
        <div className={styles.inputWrapper}>
          <input
            className={styles.dashInputField}
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder=" "
          />
          <label className={styles.dashInputLabel}>description:</label>
        </div>
        <button className={styles.dashButton} type="submit">
          <span>edit description</span>
        </button>
      </form>

      <form onSubmit={handleUpdateCoverImage} className={styles.dashForm}>
        <label className={styles.dashLabel}>update cover image/video:</label>
        <div className={styles.dashImageContainer}>
          {media.map((m) => {
            if (isVideo(m.url)) {
              return (
                <video
                  key={m._id}
                  src={m.url}
                  loop
                  muted
                  style={{
                    margin: "1px",
                    border:
                      selectedCover === m._id ? "3px solid green" : "none",
                    pointerEvents: "none",
                  }}
                  onClick={() => {
                    setCoverImage(m._id);
                    setSelectedCover(m._id);
                    setSelectedUrl(m.url);
                  }}
                />
              );
            } else {
              return (
                <img
                  key={m._id}
                  src={m.url}
                  alt="thumbnail"
                  style={{
                    margin: "1px",
                    border:
                      selectedCover === m._id ? "3px solid green" : "none",
                  }}
                  onClick={() => {
                    setCoverImage(m._id);
                    setSelectedCover(m._id);
                    setSelectedUrl(m.url);
                  }}
                />
              );
            }
          })}
        </div>

        <button className={styles.dashButton} type="submit">
          <span>update cover</span>
        </button>
      </form>

      <form className={styles.dashForm}>
        <label className={styles.dashLabel}>
          delete image/video from album:
        </label>
        <div className={styles.dashImageContainer}>
          {media.map((m) => {
            if (isVideo(m.url)) {
              return (
                <video
                  key={m._id}
                  src={m.url}
                  loop
                  muted
                  style={{
                    margin: "1px",
                    border: selectedImage === m._id ? "3px solid red" : "none",
                    pointerEvents: "none",
                  }}
                  onClick={() => {
                    setSelectedImage(m._id);
                    setSelectedUrl(m.url);
                  }}
                />
              );
            } else {
              return (
                <img
                  key={m._id}
                  src={m.url}
                  alt="thumbnail"
                  style={{
                    margin: "1px",
                    border: selectedImage === m._id ? "3px solid red" : "none",
                  }}
                  onClick={() => {
                    setSelectedImage(m._id);
                    setSelectedUrl(m.url);
                  }}
                />
              );
            }
          })}
        </div>

        <button
          type="button"
          className={styles.dashButton}
          onClick={handleDeleteImage}
        >
          <span>delete image</span>
        </button>
      </form>
      <div className={styles.selectContainer}>
        <button className={styles.deleteButton} onClick={handleDeleteAlbum}>
          <span>DELETE ALBUM</span>
        </button>
      </div>
    </div>
  );
};

export default EditAlbum;
