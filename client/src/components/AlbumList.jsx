import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Gallery from 'react-photo-gallery';
import "./AlbumList.css";

function AlbumList() {
  const [albums, setAlbums] = useState([]);

  // Image preloading function
  const preloadImage = (url) => {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  }

  useEffect(() => {
    const fetchAlbums = async () => {
      const res = await axios.get("/albums");
      const preloadedImages = await Promise.all(res.data.map(album => preloadImage(album.albumCover.url)));
      const albumsWithDimensions = preloadedImages.map((img, index) => ({
        ...res.data[index],
        albumCover: {
          url: img.src,
          width: img.naturalWidth,
          height: img.naturalHeight
        }
      }));
      setAlbums(albumsWithDimensions);
    };

    fetchAlbums();
  }, []);

  return (
    <div className="album-list">
      {albums.map((album, index) => {
        const photos = [{
          src: album.albumCover.url,
          width: album.albumCover.width,
          height: album.albumCover.height
        }];
        
        return (
          <div className="album" key={album._id}>
            <Link to={`/albums/${album._id}`} className="album-link">
              <div className="album-image">
                <Gallery photos={photos} />
                <div className="album-description">
                  {album.title}
                </div>
              </div>
            </Link>
            </div>
        )
      })}
    </div>
  );
}

export default AlbumList;
