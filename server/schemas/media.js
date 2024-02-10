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
});

module.exports = mongoose.model("Media", MediaSchema);
