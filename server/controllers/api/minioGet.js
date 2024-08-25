const express = require('express');
const router = express.Router();
const { ListObjectsV2Command, GetObjectCommand, HeadObjectCommand } = require("@aws-sdk/client-s3");
const { config } = require('dotenv');
const { Readable } = require('stream');
const { s3Client } = require('../../s3');
config({ path: './.env' });

async function streamToString(stream) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("error", reject);
      stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    });
  }
  
  async function getObjectContent(bucketName, key) {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
  
    const response = await s3Client.send(command);
    return await streamToString(response.Body);
  }
  
  async function getAllObjectsWithContent(bucketName, prefix = '') {
    let allObjects = [];
    let continuationToken = undefined;
  
    do {
      const command = new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: prefix,
        ContinuationToken: continuationToken,
        MaxKeys: 1000,
      });
  
      try {
        const response = await s3Client.send(command);
        
        if (response.Contents) {
          for (const object of response.Contents) {
            const content = await getObjectContent(bucketName, object.Key);
            allObjects.push({
              metadata: object,
              content: content
            });
          }
        }
  
        continuationToken = response.NextContinuationToken;
      } catch (err) {
        console.error("Error listing or fetching objects:", err);
        throw err;
      }
    } while (continuationToken);
  
    return allObjects;
  }

  async function getAllObjectKeys(bucketName, prefix = '') {
    let allKeys = [];
    let continuationToken = undefined;
  
    do {
      const command = new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: prefix,
        ContinuationToken: continuationToken,
        MaxKeys: 1000,
      });
  
      try {
        const response = await s3Client.send(command);
        
        if (response.Contents) {
          allKeys = allKeys.concat(response.Contents.map(object => object.Key));
        }
  
        continuationToken = response.NextContinuationToken;
      } catch (err) {
        console.error("Error listing objects:", err);
        throw err;
      }
    } while (continuationToken);
  
    return allKeys;
  }
  // 'api/minioG/getAll/:bucketName' endpoint
// gets from the database with optional filtering: ex: /api/minioG/getAll/yourBucketName?isCompleted=true
  router.get('/getAll/:bucketName', async (req, res) => {
    try {
        const { bucketName } = req.params;
        const { prefix, isCompleted } = req.query; // Add isCompleted query parameter
        
        const objects = await getAllObjectsWithContent(bucketName, prefix);
        
        // Filter objects based on isCompleted
        const filteredObjects = isCompleted 
          ? objects.filter(obj => obj.registrationFormData?.isCompleted === (isCompleted === 'true'))
          : objects;
        
        res.json({
          totalObjects: filteredObjects.length,
          objects: filteredObjects
        });
    } catch (error) {
      console.error("Error in /objects-with-content route:", error);
      res.status(500).json({ error: "An error occurred while fetching objects and their content" });
    }
  });

  router.get('/getAllKeys/:bucketName', async (req, res) => {
    try {
      const { bucketName } = req.params;
      const { prefix } = req.query; // Optional query parameter for filtering by prefix
      
      const keys = await getAllObjectKeys(bucketName, prefix);
      
      res.json({
        totalKeys: keys.length,
        keys: keys
      });
    } catch (error) {
      console.error("Error in /getAllKeys route:", error);
      res.status(500).json({ error: "An error occurred while fetching object keys" });
    }
  });

// check if exists by checksum 
  router.get('/checkObjectKey/:bucketName/:key', async (req, res) => {
    try {
      const { bucketName, key } = req.params;
  
      const command = new HeadObjectCommand({
        Bucket: bucketName,
        Key: key,
      });
  
      try {
        await s3Client.send(command);
        // If the command succeeds, the object exists
        res.status(200).json({ exists: true });
      } catch (error) {
        if (error.name === 'NotFound') {
          // If the error is NotFound, the object doesn't exist
          res.status(200).json({ exists: false });
        } else {
          // For other errors, throw to be caught by the outer catch block
          throw error;
        }
      }
    } catch (error) {
      console.error("Error in /checkObjectExists route:", error);
      res.status(500).json({ error: "An error occurred while checking object existence" });
    }
  });

  // get an object by its key
  router.get('/getObjectByKey/:bucketName/:key', async (req, res) => {
    try {
      const { bucketName, key } = req.params;
  
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: key,
      });
  
      try {
        const response = await s3Client.send(command);
        const data = await response.Body.transformToString();
        const jsonData = JSON.parse(data);
  
        // Return the object directly
        res.status(200).json({ exists: true, data: jsonData });
      } catch (error) {
        if (error.name === 'NoSuchKey') {
          // If the error is NoSuchKey, the object doesn't exist
          res.status(200).json({ exists: false, reason: 'Object not found' });
        } else {
          // For other errors, throw to be caught by the outer catch block
          throw error;
        }
      }
    } catch (error) {
      console.error("Error in /getObjectByKey route:", error);
      res.status(500).json({ error: "An error occurred while getting object by key" });
    }
  });
  
  module.exports = router;