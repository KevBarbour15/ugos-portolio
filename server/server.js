const express = require('express');
const bodyParser = require('body-parser');
const Album = require('./schemas/album');
const db = require('./db');
console.log(Album);
const app = express();
app.use(bodyParser.json());

app.post('/albums', async (req, res) => {
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

db.connect()
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3001, () => {
      console.log('Server started on port 3001');
    });
  })
  .catch((err) => {
    console.error('Could not connect to MongoDB', err);
  });
