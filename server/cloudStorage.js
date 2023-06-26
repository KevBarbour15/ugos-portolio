const { Storage } = require("@google-cloud/storage");
const storage = new Storage({
  projectId: "ugos-portfolio",
  keyFilename: "ugos-portfolio-db71ff131f10.json",
});

const bucket = storage.bucket("ugo-portfolio-media");
module.exports = bucket;
