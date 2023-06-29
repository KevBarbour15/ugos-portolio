const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const cors = require("cors");
const app = express();

app.use(cors());

const albumRoutes = require("./routes/albums");
const mediaRoutes = require("./routes/media");
const authRoutes = require("./routes/auth");

app.use(bodyParser.json());

app.use("/albums", albumRoutes);
app.use("/media", mediaRoutes);
app.use("/auth", authRoutes);

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
