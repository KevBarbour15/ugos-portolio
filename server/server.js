const express = require("express");
const db = require("./db");
const cors = require("cors");
const app = express();

app.use(cors());

// Loggers
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use(express.json()); 

const mediaRoutes = require("./routes/media");
const albumRoutes = require("./routes/albums");
const authRoutes = require("./routes/auth");
const landingRoutes = require("./routes/landing");

app.use("/media", mediaRoutes);
app.use("/albums", albumRoutes);
app.use("/auth", authRoutes);
app.use("/landing", landingRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
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
