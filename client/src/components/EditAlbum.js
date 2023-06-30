import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditAlbum.css";

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

  return (
    <div>
      <h1>Edit Album</h1>
      <select onChange={handleSelectAlbum}>
        <option>Select an album...</option>
        {albums.map((album) => (
          <option key={album._id} value={album._id}>
            {album.title}
          </option>
        ))}
      </select>

      <form onSubmit={handleUpdateTitle}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Update Title</button>
      </form>

      <form onSubmit={handleUpdateDescription}>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Update Description</button>
      </form>

      <form onSubmit={handleUpdateCoverImage}>
        <label>Cover Image:</label>
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
            />
          ))}
        </div>
        <button type="submit">Update Cover Image</button>
      </form>

      <button>Delete Album</button>
    </div>
  );
};

export default EditAlbum;
