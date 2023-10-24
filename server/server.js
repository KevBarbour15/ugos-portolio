const express = require("express");
const db = require("./db");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

const mediaRoutes = require("./routes/media");
const albumRoutes = require("./routes/albums");
const authRoutes = require("./routes/auth");
const landingRoutes = require("./routes/landing");

app.use("/landing", landingRoutes);
app.use("/media", mediaRoutes);
app.use("/albums", albumRoutes);
app.use("/auth", authRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

db.connect()
  .then(() => {
    app.listen(PORT, () => {
      if (PORT === 3001) {
        console.log("Server started on port 3001");
      } else {
        console.log("Server started on port ", PORT);
      }
    });
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB", err);
  });
