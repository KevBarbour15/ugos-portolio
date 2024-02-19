const { Storage } = require("@google-cloud/storage");

const GCLOUD_PROJECT_ID = process.env.GCLOUD_PROJECT_ID;
const GCLOUD_FILENAME = process.env.GCLOUD_FILENAME;

const storage = new Storage({
  projectId: GCLOUD_PROJECT_ID,
  keyFilename: GCLOUD_FILENAME,
});

// Reference to your specific bucket
const bucketName = "ugo-media-bucket";
const bucket = storage.bucket(bucketName);

module.exports = bucket;