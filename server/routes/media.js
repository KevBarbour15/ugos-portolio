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
    fileSize: 150 * 1024 * 1024,
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

    const fileTypeModule = await import("file-type");
    const detectedType = await fileTypeModule.fileTypeFromBuffer(
      req.file.buffer
    );

    if (!detectedType) {
      return res.status(400).send("Could not determine file type.");
    }

    if (!["image", "video"].includes(detectedType.mime.split("/")[0])) {
      return res
        .status(400)
        .send("Invalid file type. Please upload an image or video file.");
    }

    const formattedFilename = req.file.originalname.replace(/\s+/g, "_");
    const blob = bucket.file(formattedFilename);

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

module.exports = router;
