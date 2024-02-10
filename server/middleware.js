require('dotenv').config();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.UGO_SECRET_KEY;

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    jwt.verify(bearerToken, SECRET_KEY, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.userData = data;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
}

module.exports = verifyToken;
