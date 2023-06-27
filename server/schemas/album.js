const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  albumCover: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Album", AlbumSchema);
