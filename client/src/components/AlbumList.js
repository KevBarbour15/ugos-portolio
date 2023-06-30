import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AlbumList.css";

function AlbumList() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      const res = await axios.get("/albums");
      setAlbums(res.data);
    };

    fetchAlbums();
  }, []);

  return (
    <div className="album-list">
      {albums.map((album) => (
        
        <div className="album" key={album._id}>
          {console.log(album)}
          <Link to={`/albums/${album._id}`}>
            {console.log(album.albumCover)}
            <img src={album.albumCover.url} alt={album.title} /> {album.title}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default AlbumList;
