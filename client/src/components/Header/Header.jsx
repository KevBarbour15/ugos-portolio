import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import axios from "../../axiosConfig";
import gsap from "gsap";

const Header = () => {
  const [isPhotoDropdownOpen, setPhotoDropdownOpen] = useState(false);
  const [isVideoDropdownOpen, setVideoDropdownOpen] = useState(false);
  const [photoAlbums, setPhotoAlbums] = useState([]);
  const [videoAlbums, setVideoAlbums] = useState([]);
  const menuRef = useRef(null);

  useEffect(() => {
    if (isPhotoDropdownOpen || isVideoDropdownOpen) {
      gsap.to(menuRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.25,
        ease: "sine.inout",
      });
    }
  }, [isPhotoDropdownOpen, isVideoDropdownOpen]);

  const togglePhotoDropdown = () => {
    setPhotoDropdownOpen(!isPhotoDropdownOpen);
    if (isVideoDropdownOpen) setVideoDropdownOpen(false);
  };

  const toggleVideoDropdown = () => {
    setVideoDropdownOpen(!isVideoDropdownOpen);
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
              swelly sensei
            </Link>
          </div>
          <div className={styles.headerLinksContainer}>
            {/*}
            <Link
              to="/About"
              onClick={toggleBoth}
              className={styles.headerLink}
            >
              about me
            </Link>
            */}
            <button onClick={togglePhotoDropdown} className={styles.headerLink}>
              photo collections
            </button>

            <button onClick={toggleVideoDropdown} className={styles.headerLink}>
              video collections
            </button>
          </div>
        </div>
      </div>
      {isPhotoDropdownOpen && (
        <div ref={menuRef} className={styles.dropdownContainer}>
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
      )}
      {isVideoDropdownOpen && (
        <div ref={menuRef} className={styles.dropdownContainer}>
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
      )}
    </div>
  );
};

export default Header;
