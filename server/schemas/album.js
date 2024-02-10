const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  photo: {
    type: Boolean,
    required: true,
  },
  media: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
    },
  ],
  albumCover: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Media",
  },
});

module.exports = mongoose.model("Album", AlbumSchema);
