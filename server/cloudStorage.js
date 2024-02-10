const { Storage } = require("@google-cloud/storage");
const storage = new Storage({
  projectId: "ugos-portfolio-v2",
  keyFilename: "ugos-portfolio-v2-797e65bd170d.json",
});

const bucket = storage.bucket("ugo-portfolio-media");
module.exports = bucket;
