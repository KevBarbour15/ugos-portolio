// to check if the url is a video
// used in: client/src/components/Video.js, client/src/components/VideoList.js

const isVideo = (url) => {
  return [".MP4", ".mp4", ".webm", ".ogg", ".mov"].some((extension) =>
    url.endsWith(extension)
  );
};

export default isVideo;