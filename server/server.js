const express = require("express");
const db = require("./db");

const app = express();
const port = process.env.PORT || 3001;

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
  await db.connect();
});
