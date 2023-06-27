const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  album: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Album', 
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model("Media", MediaSchema);
