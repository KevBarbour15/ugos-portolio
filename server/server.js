const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const cors = require("cors");
const app = express();

app.use(cors());

const mediaRoutes = require("./routes/media");
const albumRoutes = require("./routes/albums");
const authRoutes = require("./routes/auth");

app.use(bodyParser.json());

app.use("/media", mediaRoutes);
app.use("/albums", albumRoutes);
app.use("/auth", authRoutes);

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.url}`);
  next();
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
