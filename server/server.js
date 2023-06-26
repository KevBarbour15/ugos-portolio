const express = require("express");
const bodyParser = require("body-parser");
const Album = require("./schemas/album");
const db = require("./db");
const app = express();
const bucket = require("./cloudStorage");

const { Storage } = require("@google-cloud/storage");

app.use(bodyParser.json());

app.post("/albums", async (req, res) => {
  try {
    console.log("attempting to create a new album");
    console.log(req.body);
    const album = new Album(req.body);
    await album.save();
    res.status(201).send(album);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

app.get("/albums", async (req, res) => {
  try {
    const albums = await Album.find({});
    res.send(albums);
  } catch (error) {
    console.log("Can't get albums");
    res.status(500).send(error);
  }
});

app.get("/albums/:id", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) res.status(404).send("No album found");
    res.send(album);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/albums/:id", async (req, res) => {
  try {
    const album = await Album.findByIdAndUpdate(req.params.id, req.body);
    await album.save();
    res.send(album);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/albums/:id", async (req, res) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id);
    if (!album) res.status(404).send("No album found");
    res.status(200).send("Album deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

db.connect()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3001, () => {
      console.log("Server started on port 3001");
    });
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB", err);
  });



const filename = '/Users/kevinbarbour/ugos/client/src/homepage-pics-landscape/image1.jpg';

bucket.upload(filename, (err, file) => {
  if (!err) {
    console.log('File uploaded successfully');
  } else {
    console.error('Error uploading file:', err);
  }
});
