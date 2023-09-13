import React, { useEffect, useState } from "react";
import axios from "axios";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ReactPlayer from "react-player";
import styles from "../styles/AlbumDetails.module.css";
import isVideo from "../helpers/video";

const VideoAlbumDetails = ({ id }) => {
  const [album, setAlbum] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await axios.get(`/albums/${id}`);
        setAlbum(response.data);
      } catch (error) {
        console.error("Could not fetch album", error);
      }
    };
    fetchAlbum();
  }, [id]);

  if (!album) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.albumTitle}>{album.title}</h2>
      <p className={styles.albumInfo}>{album.description}</p>

      {album.media && album.media.length > 0 ? (
        <>
          <ResponsiveMasonry rowsCountBreakPoints={{ 350: 1, 750: 2, 900: 2 }}>
            <Masonry>
              {album.media.map((media, index) => (
                <div
                  key={index}
                  className={styles.album}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className={styles.galleryImage}>
                    {console.log(isVideo(media.url))}
                    {isVideo(media.url) ? (
                      <ReactPlayer
                        url={media.url}
                        controls={isHovered}
                        playing
                        loop
                        muted
                      />
                    ) : (
                      <img src={media.url} alt="" />
                    )}
                  </div>
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </>
      ) : (
        <p>No media in this album.</p>
      )}
    </div>
  );
};

export default VideoAlbumDetails;
