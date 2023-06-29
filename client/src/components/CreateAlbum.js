import React, { useState } from "react";
import axios from "axios";

const CreateAlbum = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const album = {
      title,
      description,
    };

    try {
      await axios.post("/albums", album, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // handle success here, e.g., show a success message or redirect
    } catch (error) {
      // handle error here
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Create New Album</h1>
      <form onSubmit={onSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create Album</button>
      </form>
    </div>
  );
};

export default CreateAlbum;
