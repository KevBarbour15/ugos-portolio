import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import axios from "../../axiosConfig";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Header = () => {
  const [isPhotoDropdownOpen, setPhotoDropdownOpen] = useState(false);
  const [isVideoDropdownOpen, setVideoDropdownOpen] = useState(false);
  const [photoAlbums, setPhotoAlbums] = useState([]);
  const [videoAlbums, setVideoAlbums] = useState([]);
  const photoMenuRef = useRef(null);
  const videoMenuRef = useRef(null);

  useGSAP(() => {
    if (isPhotoDropdownOpen) {
      gsap.to(photoMenuRef.current, {
        duration: 0.5,
        y: 0,
      });
    } else {
      gsap.to(photoMenuRef.current, {
        duration: 0.5,
        y: -60,
      });
    }
  }, [isPhotoDropdownOpen]);

  useGSAP(() => {
    if (isVideoDropdownOpen) {
      gsap.to(videoMenuRef.current, {
        duration: 0.5,
        y: 0,
      });
    } else {
      gsap.to(videoMenuRef.current, {
        duration: 0.5,
        y: -60,
      });
    }
  }, [isVideoDropdownOpen]);

  const togglePhotoDropdown = () => {
    if (isPhotoDropdownOpen) {
      setPhotoDropdownOpen(false);
    } else {
      setPhotoDropdownOpen(true);
    }
    if (isVideoDropdownOpen) setVideoDropdownOpen(false);
  };

  const toggleVideoDropdown = () => {
    if (isVideoDropdownOpen) {
      setVideoDropdownOpen(false);
    } else {
      setVideoDropdownOpen(true);
    }
    if (isPhotoDropdownOpen) setPhotoDropdownOpen(false);
  };

  const toggleBoth = () => {
    setPhotoDropdownOpen(false);
    setVideoDropdownOpen(false);
  };

  const fetchAlbums = async () => {
    try {
      const res = await axios.get("/albums");

      const photoAlbums = res.data.filter((album) => album.photo);
      const videoAlbums = res.data.filter((album) => !album.photo);

      setPhotoAlbums(photoAlbums);
      setVideoAlbums(videoAlbums);
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerNavContainer}>
          <div className={styles.headerTitleContainer}>
            <Link className={styles.headerTitle} to="/">
              swelly studio
            </Link>
          </div>
          <div className={styles.headerLinksContainer}>
            <button onClick={togglePhotoDropdown} className={styles.headerLink}>
              photo collections
            </button>

            <button onClick={toggleVideoDropdown} className={styles.headerLink}>
              video collections
            </button>
          </div>
        </div>
      </div>
      <div
        ref={photoMenuRef}
        className={`${styles.dropdownContainer} ${
          isPhotoDropdownOpen ? styles.visible : styles.hidden
        }`}
      >
        <div className={styles.dropdownNavContainer}>
          <div className={styles.dropdownLinks}>
            {photoAlbums.map((album, idx) => (
              <Link
                to={`/photo-collection/${album._id}`}
                key={album._id}
                className={styles.dropdownLink}
                onClick={toggleBoth}
              >
                photo collection {idx + 1}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={videoMenuRef}
        className={`${styles.dropdownContainer} ${
          isVideoDropdownOpen ? styles.visible : styles.hidden
        }`}
      >
        <div className={styles.dropdownNavContainer}>
          <div className={styles.dropdownLinks}>
            {videoAlbums.map((album, idx) => (
              <Link
                to={`/video-collection/${album._id}`}
                key={album._id}
                className={styles.dropdownLink}
                onClick={toggleBoth}
              >
                video collection {idx + 1}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
