const express = require("express");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware");
const router = express.Router();

const SECRET_KEY = "verysecretkey";

router.post("/Login", (req, res) => {
  const { username, password } = req.body;

  if (username === "ugo" && password === "ugo") {
    const token = jwt.sign({ username }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
});

router.get("/validate-token", verifyToken, (req, res) => {
  res.status(200).send({ valid: true });
});


module.exports = router;
