const express = require('express');
const router = express.Router();
const { config } = require('dotenv');
const Minio = require('minio');
config({ path: './.env' });

// Configure the MinIO client
const minioClient = new Minio.Client({
    endPoint: '34.135.9.49',
    port: 9000,
    useSSL: false,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin'
  });

  // removeObjectLock('stjda-signup-forms', '(Corrected)Development Contract.pdf');

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
  // removeObjectLock('stjda-signup-forms', '(Corrected)Development Contract.pdf');
  async function listBuckets() {
    try {
      const { Buckets } = await s3Client.send(new ListBucketsCommand({}));
      console.log('Success', Buckets);
    } catch (err) {
      console.error('Error', err);
    }
  }
  
  async function deleteObject(bucketName, objectName) {
    try {
        // Attempt to remove the object
        await minioClient.removeObject(bucketName, objectName);
        console.log(`Object ${objectName} deleted successfully from ${bucketName}.`);
        return true;
    } catch (error) {
        console.error("Failed to delete object:", error);
        return false;
    }
}

// deleteObject('stjda-signup-forms', 'Residential Camp, Robotics Camp, Nature Camp:Guy:Beals:0:ted:L:male');

  // 'api/minioG' endpoint
// gets from the database
router.delete('/delete/:bucketName/:objectName', async (req, res) => {
try{
    const { bucketName, objectName } = req.params;

    // Attempt to delete the object
    const success = await deleteObject(bucketName, objectName);
    if (success) {
        res.status(200).json({ message: "Object deleted successfully." });
    } 
}catch(err){
    res.status(500).json({ error: "Failed to delete object. Please check logs for details." });
}
});

module.exports = router;