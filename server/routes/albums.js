const express = require("express");
const Album = require("../schemas/album");
const Media = require("../schemas/media");
const verifyToken = require("../middleware");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/", verifyToken, async (req, res) => {
  try {
    const album = new Album(req.body);
    await album.save();
    res.status(201).send(album);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send("An album with this title already exists");
    } else {
      res.status(400).send(error);
    }
  }
});

router.get("/", async (req, res) => {
  try {
    const albums = await Album.find({}).populate("albumCover");
    res.send(albums);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) res.status(404).send("No album found");
    res.send(album);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const album = await Album.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("albumCover");
    res.send(album);
  } catch (error) {
    console.log("ERROR: ", error);
    res.status(500).send(error);
  }
});

router.delete("/:id/media/:mediaId", verifyToken, async (req, res) => {
  try {
    const { id: albumId, mediaId } = req.params;

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

    res.status(200).send("Media deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id);
    if (!album) res.status(404).send("No album found");
    res.status(200).send("Album deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
