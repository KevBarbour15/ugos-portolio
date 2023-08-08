const express = require("express");
const multer = require("multer");
const Landing = require("../schemas/landing");
const bucket = require("../cloudStorage");
const verifyToken = require("../middleware");
const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 150 * 1024 * 1024,
  },
});

router.get("/videos", async (req, res) => {
  console.log("Got here");
  const landing = await Landing.findOne();
  if (landing) {
    res.json(landing);
  } else {
    res.status(404).send("Not found");
  }
});

router.post("/setRandom", verifyToken, async (req, res) => {
  console.log("Got here!");
  try {
    if (typeof req.body.random !== "boolean") {
      return res.status(400).json({ error: "Invalid input." });
    }

    const landing = await Landing.findOne();
    if (landing) {
      landing.random = req.body.random;
      await landing.save();
      res.json({
        message: "Random setting updated successfully",
        random: landing.random,
      });
    } else {
      res.status(404).json({ error: "Landing page configuration not found." });
    }
  } catch (error) {
    console.error("Error updating random setting:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/setCurrent", verifyToken, async (req, res) => {
  console.log("Got here!");
  try {
    if (!req.body.current) {
      return res.status(400).json({ error: "Invalid input." });
    }

    const landing = await Landing.findOne();
    if (landing) {
      landing.current = req.body.current;
      await landing.save();
      res.json({
        message: "Current video updated successfully",
        current: landing.current,
      });
    } else {
      res.status(404).json({ error: "Landing page configuration not found." });
    }
  } catch (error) {
    console.error("Error updating current video:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.post(
  "/upload",
  verifyToken,
  upload.single("video"),
  async (req, res, next) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const fileTypeModule = await import("file-type");
    const detectedType = await fileTypeModule.fileTypeFromBuffer(
      req.file.buffer
    );

    if (!detectedType || detectedType.mime.split("/")[0] !== "video") {
      return res
        .status(400)
        .send("Invalid file type. Please upload a video file.");
    }

    const blob = bucket.file(req.file.originalname);

    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on("error", (err) => {
      next(err);
    });

    blobStream.on("finish", async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      const landing = await Landing.findOne();
      if (!landing) {
        const newLanding = new Landing({
          random: false,
          current: publicUrl,
          videos: [publicUrl],
        });
        await newLanding.save();
      } else {
        landing.videos.push(publicUrl);
        await landing.save();
      }

      res.status(200).send({ url: publicUrl });
    });

    blobStream.end(req.file.buffer);
  }
);

module.exports = router;
