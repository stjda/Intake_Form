const express = require('express');
const router = express.Router();
const { config } = require('dotenv');
const { s3Client } = require('../../s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const multer = require('multer');
const { Buffer } = require('buffer');
const mime = require('mime-types');

config({ path: '../../.env' });
const { PutObjectCommand,  ListBucketsCommand, GetObjectCommand, HeadBucketCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");

// Multer configuration
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB limit
});

/**
 * Lists all buckets in the MinIO storage.
 * @async
 * @function listBuckets
 * @returns {Promise<void>}
 */
async function listBuckets() {
  try {
      const { Buckets } = await s3Client.send(new ListBucketsCommand({}));
      console.log('Success', Buckets);
  } catch (err) {
      console.error('Error', err);
  }
}

/**
 * Calculates age based on date of birth.
 * @function calculateAge
 * @param {string} dob - Date of birth in string format
 * @returns {number|string} Age or 'Unknown' if dob is not provided
 */
const calculateAge = (dob) => {
  if (!dob) return 'Unknown'; // Return 'Unknown' if dob is undefined or null
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

/**
 * Removes unselected camps from the data.
 * @function removeUnselectedCamps
 * @param {Array} data - Array of user data objects
 * @returns {Array} Updated data with only selected camps
 */
function removeUnselectedCamps(data) {
  return data.map(item => {
    const selectedCamps = Object.entries(item.selectedCamps)
      .filter(([_, value]) => value === true)
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

    return {
      ...item,
      selectedCamps
    };
  });
}

/**
 * Converts selected camps to a string representation.
 * @function selectedCampsToString
 * @param {Array} userData - Array of user data objects
 * @returns {Array} Updated data with selected camps as strings
 */
function selectedCampsToString(userData) {
  return userData.map(item => {
    const campKeys = ['Residential Camp', 'Robotics Camp', 'Science Camp', 'Nature Camp'];
    const selectedCampsString = campKeys
      .filter(camp => camp in item.selectedCamps)
      .join(', ');

    return {
      ...item,
      selectedCamps: selectedCampsString
    };
  });
}

/**
 * Adds new forms to MinIO.
 * @name POST /api/minioP
 * @function
 * @async
 * @param {Object} req.body - The request body containing user data
 * @returns {Object} JSON response with upload status & key : ${selectedCampsString}-${firstName}-${lastName}-${age}-${primaryCarePhysician}-${tShirtSize}-${gender}`;
 */
router.post('/', async (req, res) => {
  try {
    if(!req.body){
      return res.status(400).json({ error: 'Request body is missing' });
    }
    const userData = req.body; // Assuming the client sends the user data in the request body
    const updatedData = removeUnselectedCamps(userData);
    const dataToUse = selectedCampsToString(updatedData);
    const age = calculateAge(dataToUse[0].registrationFormData.birthDate);
    const {firstName, lastName, primaryCarePhysician, tShirtSize, gender} = dataToUse[0].registrationFormData

    const key = `${dataToUse[0].selectedCamps},${firstName},${lastName},${age},${primaryCarePhysician},${tShirtSize},${gender}`;
    const serializedData = JSON.stringify(dataToUse);
    // Set up the MinIO upload parameters
    const params = {
      Bucket: "stjda-signup-forms", // Replace with your bucket name
      Key: key,
      Body: serializedData,
    };

    // Send the data to MinIO
    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    res.status(200).json({ 
      message: "Data successfully sent to MinIO",
      key: key,
      syncTime: new Date().toISOString() 
    });
  } catch (error) {
    console.error("Error sending data to MinIO:", error);
    res.status(500).json({ error: "Error sending data to MinIO" });
  }
});

/**
 * Retrieves an object by its key and bucket.
 * @name POST api/minioP/completed/:bucket/:key
 * @function
 * @async
 * @param {string} req.params.bucket - The bucket name
 * @param {string} req.params.key - The object key
 * @returns {Object} JSON response with retrieved data or error message
 */
router.post('/completed/:bucket/:key', async (req, res) => {
  try {
      const { bucket, key } = req.params;

      // Check if the bucket exists
      try {
          await s3Client.send(new HeadBucketCommand({ Bucket: bucket }));
      } catch (error) {
          if (error.name === 'NotFound') {
              return res.status(404).json({ error: 'Bucket not found' });
          } else {
              throw error;
          }
      }

      // Get the object (file) from S3
      const getCommand = new GetObjectCommand({
          Bucket: bucket,
          Key: key
      });

      const { Body } = await s3Client.send(getCommand);
      
      // Read the stream
      let responseBody = '';
      for await (const chunk of Body) {
          responseBody += chunk.toString();
      }

      res.status(200).json({ 
          message: "Data successfully retrieved from MinIO",
          bucket,
          key,
          data
      });
  
  } catch (error) {
      if (error.name === 'NoSuchKey') {
          res.status(404).json({ error: "Object not found in MinIO" });
      } else {
          console.error("Error retrieving data from MinIO:", error);
          res.status(500).json({ error: "Error retrieving data from MinIO" });
      }
  }
});

/**
 * Uploads data to a specified bucket in MinIO.
 * @name POST api/minioP/:bucket
 * @function
 * @async
 * @param {string} req.params.bucket - The bucket name
 * @param {Object} req.body.data - The user data to upload
 * @param {string} req.body.key - The key for the uploaded object
 * @returns {Object} JSON response with upload status
 */
router.post('/:bucket', async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: 'Request body is missing' });
    }
    const { bucket } = req.params;
    const userData = req.body.data; // Assuming the client sends the user data in the request body
    const key = req.body.key;

    if (!userData || !key) {
      return res.status(400).json({ error: 'User data or key is missing' });
    }

    const serializedData = JSON.stringify(userData);
    // Set up the MinIO upload parameters
    const params = {
      Bucket: bucket, // Use the bucket from the route parameter
      Key: key,
      Body: serializedData,
    };

    // Send the data to MinIO
    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    res.status(200).json({ 
      message: "Data successfully sent to MinIO",
      bucket: bucket,
      key: key,
      syncTime: new Date().toISOString() 
    });
  } catch (error) {
    console.error("Error sending data to MinIO:", error);
    res.status(500).json({ error: "Error sending data to MinIO" });
  }
});

/**
 * Uploads a file or JSON data to a specified bucket in MinIO.
 * @name POST api/minioP/upload/:bucket
 * @function
 * @async
 * @param {string} req.params.bucket - The bucket name
 * @param {Object} req.body.data - The user data to upload (if no file)
 * @param {string} req.body.key - The key for the uploaded object
 * @param {Object} req.file - The uploaded file (if present)
 * @returns {Object} JSON response with upload status and viewable URL
 */
router.post('/upload/:bucket', upload.single('file'), async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: 'Request body is missing' });
    }
    const { bucket } = req.params;
    const { data, key, metadata } = req.body;
    console.log("file type incoming: ", metadata.fileType)
    const fileType = metadata.fileType; 
   

    if (!data || !key) {
      return res.status(400).json({ error: 'PDF data or key is missing' });
    }

    // Determine the correct file extension and MIME type
    const fileExtension = fileType ? `.${mime.extension(fileType)}` : '';
    const contentType = fileType || 'application/octet-stream';

    // Remove data URI prefix for any file type
    const base64Data = data.replace(/^data:[^;]+;base64,/, "");
    
     // Decode the base64 string to a buffer
     const fileBuffer = Buffer.from(base64Data, 'base64');
    
    // Prepare metadata
    const sanitizedMetadata = {};
    if (metadata && typeof metadata === 'object') {
      Object.keys(metadata).forEach(key => {
        if (typeof metadata[key] === 'string') {
          sanitizedMetadata[key] = metadata[key];
        } else {
          sanitizedMetadata[key] = JSON.stringify(metadata[key]);
        }
      });
    }

    // Set up the MinIO upload parameters
    const params = {
      Bucket: bucket,
      Key: `${key}${fileExtension}`,
      Body: fileBuffer,
      ContentType: contentType,
      Metadata: sanitizedMetadata
    };

    // Send the data to MinIO
    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    // Generate a signed URL for viewing the object
    const getObjectCommand = new GetObjectCommand({ Bucket: bucket, Key: `${key}${fileExtension}` });
    // create a signed URL
    let url = await getSignedUrl(s3Client, getObjectCommand, { expiresIn: 604750 }); // URL expires in 1 week

    // Replace the MinIO server address with proxy server address
    const proxyServerAddress = "http://34.135.9.49:3000"; // proxy server address
    // this cuts up the url so it will properly hit the middleware proxy in server.js when selected
    url = url.replace(/^https?:\/\/[^\/]+/, `${proxyServerAddress}/minio`); 

    res.status(200).json({
      message: `${fileExtension} successfully sent to MinIO`,
      bucket: bucket,
      key: `${key}${fileExtension}`,
      syncTime: new Date().toISOString(),
      viewUrl: url
    });
  } catch (error) {
    console.error("Error sending PDF to MinIO:", error);
    res.status(500).json({ error: "Error sending PDF to MinIO", details: error.message, stack: error.stack });
  }
});


module.exports = router;