const express = require("express");
const Album = require("../schemas/album");
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
    const album = await Album.findById(req.params.id).populate(
      "media albumCover"
    );
    if (!album) res.status(404).send("No album found");
    res.send(album);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    console.log(
      `Is albumCover id valid? ${mongoose.Types.ObjectId.isValid(
        req.body.albumCover
      )}`
    );
    console.log("ID: ", req.params.id);
    console.log("Body: ", req.body);
    const album = await Album.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("albumCover");
    res.send(album);
  } catch (error) {
    console.log("ERROR: ", error);
    res.status(500).send(error);
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
