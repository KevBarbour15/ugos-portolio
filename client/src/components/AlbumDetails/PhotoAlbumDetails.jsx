import { useEffect, useState, useRef } from "react";
import axios from "../../axiosConfig";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "./AlbumDetails.scss";

// Animation imports
import useFadeIn from "../../animations/useFadeIn";
import useScramble from "../../animations/useScramble";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Loader imports
import MoonLoader from "react-spinners/MoonLoader";

const PhotoAlbumDetails = ({ id }) => {
  const [album, setAlbum] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [minLoadTimePassed, setMinLoadTimePassed] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const minLoadingTime = 250;

  useGSAP(() => {
    gsap.from(".galleryImage", {
      scrollTrigger: {
        trigger: ".galleryImage",
        start: "top 50%",
        end: "top 40%",
        scrub: 1,
      },
      delay: 0.25,
      opacity: 0,
      x: -30,
    });
  });

  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const infoRef = useRef(null);
  const bodyRef = useRef(null);
  const galleryImagesRef = useRef([]);

  useFadeIn(shouldAnimate, headerRef, 0.5, 0.75, 0);
  useScramble(shouldAnimate, titleRef, 0.75, 1.25, title);
  useScramble(shouldAnimate, infoRef, 0.75, 1.25, description);
  useFadeIn(shouldAnimate, bodyRef, 0.5, 0.75, 0);

  const preloadImage = (url) => {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = url;
      img.onload = () => {
        resolve(img);
      };
      img.onerror = (error) => {
        console.error("Error loading image:", url, error);
        reject(error);
      };
    });
  };

  const fetchAlbum = async () => {
    setIsLoading(true);
    setMinLoadTimePassed(false);
    setShouldAnimate(false);
    galleryImagesRef.current = [];
    try {
      const response = await axios.get(`/albums/${id}`);

      const albumData = response.data;

      setTitle(albumData.title);
      setDescription(albumData.description);

      const preloadedImages = await Promise.all(
        albumData.media.map((media) => preloadImage(media.url))
      );

      const media = preloadedImages.map((img, index) => {
        return {
          ...albumData.media[index],
          url: img.src,
        };
      });

      setAlbum({ ...albumData, media: media });
      console.log(album);
    } catch (error) {
      console.error("Could not fetch album", error);
    } finally {
      setTimeout(() => {
        setMinLoadTimePassed(true);
      }, minLoadingTime);
    }
  };

  useEffect(() => {
    console.log("id: ", id);
    fetchAlbum();
  }, [id]);

  useEffect(() => {
    if (minLoadTimePassed) {
      setIsLoading(false);
      setShouldAnimate(true);
    }
  }, [minLoadTimePassed]);

  return (
    <div className="albumContainer">
      {isLoading ? (
        <div className="loadingContainer">
          <MoonLoader
            color={"black"}
            loading={true}
            size={75}
            speedMultiplier={0.5}
          />
        </div>
      ) : (
        <>
          <div ref={headerRef} className="albumHeader">
            <div className="albumInfoWrapper">
              <h2 ref={titleRef} className="albumTitle">
                {title}
              </h2>
              <p ref={infoRef} className="albumInfo">
                {description}
              </p>
            </div>
          </div>
          <div ref={bodyRef} className="mediaContainer">
            {album.media.map((media, index) => (
              <div
                key={index}
                onClick={() => {
                  setPhotoIndex(index);
                  setIsOpen(true);
                }}
              >
                <div className="galleryImage">
                  <img
                    ref={(el) => (galleryImagesRef.current[index] = el)}
                    src={media.url}
                    alt=""
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {isOpen && (
        <Lightbox
          mainSrc={album.media[photoIndex].url}
          nextSrc={album.media[(photoIndex + 1) % album.media.length].url}
          prevSrc={
            album.media[
              (photoIndex + album.media.length - 1) % album.media.length
            ].url
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + album.media.length - 1) % album.media.length
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % album.media.length)
          }
        />
      )}
    </div>
  );
};

export default PhotoAlbumDetails;
