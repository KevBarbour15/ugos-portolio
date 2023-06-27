const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const app = express();

const albumRoutes = require("./routes/albums");
const mediaRoutes = require("./routes/media");


app.use("/albums", albumRoutes);
app.use("/media", mediaRoutes);


app.use(bodyParser.json());

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
