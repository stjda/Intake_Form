const express = require('express');
const router = express.Router();
const { config } = require('dotenv');

config({ path: '../../.env' });
const { PutObjectCommand, S3Client,  ListBucketsCommand } = require("@aws-sdk/client-s3");

// MinIO client configuration
const s3Client = new S3Client({
  endpoint: process.env.ENDPOINT, 
  region: "us-east-1", 
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID, 
    secretAccessKey: process.env.SECRET_ACCESS_KEY, 
  },
  forcePathStyle: true, // Important for MinIO compatibility
});
  

// Function to remove the lock from an object
async function removeObjectLock(bucketName, objectName) {
  try {
      // Get object lock configuration
      const lockConfig = await minioClient.getObjectLockConfig(bucketName);
      console.log("Current Lock Configuration:", lockConfig);

      // Remove object lock if it exists
      if (lockConfig && lockConfig.mode) {
          await minioClient.setObjectLockConfig(bucketName, '');
          console.log(`Lock removed from bucket ${bucketName}`);
      }

      // Your code to delete the object
      await minioClient.removeObject(bucketName, objectName);
      console.log(`Object ${objectName} deleted successfully.`);
  } catch (error) {
      console.error("Failed to remove object lock or delete object:", error);
  }
}

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
// return `${selectedCampsString}-${firstName}-${lastName}-${age}-${primaryCarePhysician}-${tShirtSize}-${gender}`;
// 'api/minioP' endpoint
// add new forms to minioP
// sets the keys to the data
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

module.exports = router;