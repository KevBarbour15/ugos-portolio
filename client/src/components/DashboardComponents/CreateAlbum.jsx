import React, { useState } from "react";
import axios from "../../axiosConfig";
import styles from "../../pages/Dashboard/Dashboard.module.scss";

const CreateAlbum = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedOption, setSelectedOption] = useState("photo");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      return;
    }

    let option;
    const album = {
      title,
      description,
      photo: selectedOption === "photo",
    };

    if (selectedOption === "photo") {
      option = "photo";
    } else {
      option = "video";
    }

    try {
      const response = await axios.post("/albums", album, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(response);
      setTitle("");
      setDescription("");
      setSelectedOption("photo");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.dashContainer}>
      <div className={styles.photoVideoSwitch}>
        <span className={styles.labelText}>photo</span>
        <input
          id="photoVideoSwitch"
          type="checkbox"
          checked={selectedOption === "video"}
          onChange={() =>
            setSelectedOption((prev) => (prev === "photo" ? "video" : "photo"))
          }
        />
        <label
          htmlFor="photoVideoSwitch"
          className={styles.switchLabel}
        ></label>
        <span className={styles.labelText}>video</span>
      </div>
      <form className={styles.dashForm} onSubmit={onSubmit}>
        <div className={styles.inputWrapper}>
        <label className={styles.dashLabel} htmlFor="albumTitle">
            title:
          </label>
          <input
            className={styles.dashInputField}
            id="albumTitle"
            type="text"
            placeholder="album title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
         
        </div>

       
        <div className={styles.inputWrapper}>
        <label className={styles.dashLabel} htmlFor="albumDescription">
            description:
          </label>
          <input
            className={styles.dashInputField}
            id="albumDescription"
            placeholder="album description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          
        </div>

        <button className={styles.dashButton} type="submit">
          Create album
        </button>
      </form>
    </div>
  );
};

export default CreateAlbum;
