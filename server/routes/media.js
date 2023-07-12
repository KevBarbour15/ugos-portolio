const express = require("express");
const multer = require("multer");
const Media = require("../schemas/media");
const Album = require("../schemas/album");
const bucket = require("../cloudStorage");
const verifyToken = require("../middleware");
const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 75 * 1024 * 1024,
  },
});

router.post(
  "/upload",
  verifyToken,
  upload.single("file"),
  async (req, res, next) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const blob = bucket.file(req.file.originalname);

    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on("error", (err) => {
      next(err);
    });

    blobStream.on("finish", async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      const media = new Media({
        album: req.body.album,
        url: publicUrl,
      });

      await media.save();

      const album = await Album.findById(req.body.album);
      if (album) {
        album.media.push(media._id);
        if (!album.albumCover) {
          album.albumCover = media._id;
        }
        await album.save();
      } else {
        console.log(`No album with id: ${req.body.album} found`);
      }

      res.status(200).send({ url: publicUrl });
    });

    blobStream.end(req.file.buffer);
  }
);

router.delete("/:albumId/media/:mediaId", verifyToken, async (req, res) => {
  console.log("DELETE MEDIA");
  try {
    const { albumId, mediaId } = req.params;

    const media = await Media.findByIdAndDelete(mediaId);
    if (!media) {
      console.error(`No media found with id: ${mediaId}`);
      return res.status(404).send("No media found");
    }
        const album = await Album.findById(albumId);
    if (!album) return res.status(404).send("No album found");

    const mediaIndex = album.media.indexOf(mediaId);
    if (mediaIndex !== -1) {
      album.media.splice(mediaIndex, 1);
      await album.save();
    }

    if (album.albumCover.toString() === mediaId) {
      album.albumCover = null;
      await album.save();
    }

    res.status(200).send("Media deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
