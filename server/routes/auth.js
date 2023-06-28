const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const SECRET_KEY = "verysecretkey";

router.post("/login", (req, res) => {
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

module.exports = router;
