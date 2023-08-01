const mongoose = require("mongoose");

const LandingSchema = new mongoose.Schema({
  random: {
    type: Boolean,
    required: true,
  },
  current: {
    type: String,
    required: false,
  },
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

module.exports = mongoose.model("Landing", LandingSchema);
