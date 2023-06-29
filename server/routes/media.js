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
    fileSize: 15 * 1024 * 1024,
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
