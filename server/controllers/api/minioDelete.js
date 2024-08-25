const express = require('express');
const router = express.Router();
const { config } = require('dotenv');
const { s3Client } = require('../../s3');
const { DeleteObjectCommand, GetObjectLockConfigurationCommand, PutObjectLockConfigurationCommand } = require("@aws-sdk/client-s3");

config({ path: './.env' });

// Function to remove the lock from an object
async function removeObjectLock(bucketName, objectName) {
    try {
        // Get object lock configuration
        const getLockCommand = new GetObjectLockConfigurationCommand({ Bucket: bucketName });
        const lockConfig = await s3Client.send(getLockCommand);
        console.log("Current Lock Configuration:", lockConfig);

        // Remove object lock if it exists
        if (lockConfig && lockConfig.ObjectLockConfiguration) {
            const removeLockCommand = new PutObjectLockConfigurationCommand({
                Bucket: bucketName,
                ObjectLockConfiguration: { ObjectLockEnabled: "Disabled" }
            });
            await s3Client.send(removeLockCommand);
            console.log(`Lock removed from bucket ${bucketName}`);
        }

        // Delete the object
        await deleteObject(bucketName, objectName);
        console.log(`Object ${objectName} deleted successfully.`);
    } catch (error) {
        console.error("Failed to remove object lock or delete object:", error);
    }
}

// Function to delete an object
async function deleteObject(bucketName, objectName) {
    console.log(`Deleting object ${objectName} from ${bucketName}...`);
    try {
        const command = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: objectName
        });
        await s3Client.send(command);
        console.log(`Object ${objectName} deleted successfully from ${bucketName}.`);
        return true;
    } catch (error) {
        console.error("Failed to delete object:", error);
        return false;
    }
}

// deleteObject('stjda-signup-forms', 'Residential Camp, Robotics Camp, Nature Camp:Guy:Beals:0:ted:L:male');

// 'api/minioG/delete/:bucket/:key' endpoint to delete from the database
router.delete('/delete/:bucket/:key', async (req, res) => {
  try {
    const { bucket, key } = req.params;
      console.log("delete: ", bucket, key );
        // Attempt to delete the object
        const success = await deleteObject(bucket, key);
        if (success) {
            res.status(200).json({ message: "Object deleted successfully." });
        } else {
            throw new Error("Deletion failed");
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to delete object. Please check logs for details." });
    }
});

module.exports = router;