const path = require('path');
const { config } = require('dotenv');
const { S3Client } = require("@aws-sdk/client-s3");

// Load environment variables
const envPath = path.resolve(__dirname, '.env');
config({ path: envPath });

// MinIO client configuration
const s3Client = new S3Client({
  endpoint: process.env.ENDPOINT,
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
  forcePathStyle: true, // Important for MinIO compatibility
});


// Export only the S3 client
module.exports = { s3Client };