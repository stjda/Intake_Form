const express = require('express');
const router = express.Router();
const { config } = require('dotenv');
const { s3Client } = require('../../s3');
config({ path: '../../.env' });
const { PutObjectCommand,  ListBucketsCommand } = require("@aws-sdk/client-s3");
  
async function listBuckets() {
  try {
      const { Buckets } = await s3Client.send(new ListBucketsCommand({}));
      console.log('Success', Buckets);
  } catch (err) {
      console.error('Error', err);
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