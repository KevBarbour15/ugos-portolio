import React, { useState, useEffect } from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/EditLanding.module.css";  

function EditLanding() {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [landingVideos, setLandingVideos] = useState([]);
    const [isRandom, setIsRandom] = useState(false);

    useEffect(() => {
        fetchLandingVideos();
    }, []);

    const fetchLandingVideos = async () => {
        const res = await axios.get("/landing/videos"); 
        setLandingVideos(res.data.videos);
        setIsRandom(res.data.random);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && !file.type.startsWith("video/")) {
            alert("Please upload a video file");
            return;
        }
        setFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("video", file);
        try {
            const res = await axios.post("/landing/upload", data);
            console.log("Video uploaded successfully. Response:", res.data);
            fetchLandingVideos();  
        } catch (error) {
            console.error("An error occurred while uploading the video.", error);
        }
    };

    const handleSetCurrentVideo = async (videoUrl) => {
        try {
            await axios.post("/landing/setCurrent", { videoUrl });
            fetchLandingVideos();  // Refetch to update the list
        } catch (error) {
            console.error("Error setting current video:", error);
        }
    };

    const handleToggleRandom = async () => {
        try {
            await axios.post("/landing/setRandom", { random: !isRandom });
            setIsRandom(!isRandom);
        } catch (error) {
            console.error("Error setting random mode:", error);
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.uploadForm} onSubmit={handleSubmit}>
                <label htmlFor="video" className={styles.uploadLabel}>
                    Select video to upload for landing:
                </label>
                <input
                    className={styles.uploadInput}
                    type="file"
                    id="video"
                    onChange={handleFileChange}
                    accept="video/*"
                />

                <ProgressBar className={styles.progressBar} now={progress} label={`${progress}%`} />

                <button type="submit" className={styles.uploadButton}>
                    Upload video
                </button>
            </form>
            
            <div className={styles.videosList}>
                {landingVideos.map(video => (
                    <div key={video} className={styles.videoItem}>
                        <span>{video}</span>
                        <button onClick={() => handleSetCurrentVideo(video)}>
                            Set as Current
                        </button>
                    </div>
                ))}
            </div>

            <button className={styles.randomToggle} onClick={handleToggleRandom}>
                {isRandom ? "Disable Random Video" : "Enable Random Video"}
            </button>
        </div>
    );
}

export default EditLanding;
