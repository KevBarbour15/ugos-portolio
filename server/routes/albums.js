const express = require("express");
const Album = require("../schemas/album");
const verifyToken = require("../middleware");
const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const album = new Album(req.body);
    await album.save();
    res.status(201).send(album);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const albums = await Album.find({});
    res.send(albums);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate("media");
    if (!album) res.status(404).send("No album found");
    console.log(album); // log the album data
    res.send(album);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const album = await Album.findByIdAndUpdate(req.params.id, req.body);
    await album.save();
    res.send(album);
  } catch (error) {
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
