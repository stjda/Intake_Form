import React, { useEffect, useState, useCallback } from 'react';
import { openSTJDADB, USER_STORE, DB_NAME } from '../../screens/Home/sections/Registration/CampRegistration';
import axios from 'axios';
import { Box, Typography, Paper } from '@mui/material';

export const DataSync = ({ disableButton, requestFailed, failedRequest }) => {
  const [isSyncing, setIsSyncing] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [error, setError] = useState(failedRequest);

  const syncData = useCallback(async () => {
    if (!isSyncing) return;

    try {
      const db = await openSTJDADB();
      const tx = db.transaction(USER_STORE, 'readonly');
      const store = tx.objectStore(USER_STORE);
      const allData = await store.getAll();

      console.log("Data retrieved from IndexedDB:", allData);

      const response = await axios.post('http://34.135.9.49:3000/api/minioP', allData);
      if (response.status === 200) {
        console.log("Data sent to MinIO successfully");
        setIsSyncing(false);
        disableButton(false);
        requestFailed(false);
      } else {
        requestFailed(true);
        throw new Error("Failed to send data to MinIO");
      }
      // clear indexDB for STJDA_SignUp
      const deleteRequest = indexedDB.deleteDatabase(DB_NAME)
      deleteRequest.onerror = function() {
        console.error("Error removing data.");
      };

    } catch (error) {
      console.error("Error syncing data:", error);
      requestFailed(true);
      setRetryCount(prevCount => prevCount + 1);
      if (retryCount >= 4) {  // 5 attempts total (initial + 4 retries)
        setIsSyncing(false);
        console.error("Max retry attempts reached");
      }
    }
  }, [isSyncing, retryCount, disableButton]);

  useEffect(() => {
    if (isSyncing && retryCount < 5) {
      const timeoutId = setTimeout(syncData, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [syncData, isSyncing, retryCount]);

  return (
    <Paper elevation={3} sx={{ padding: 2, maxWidth: 400, margin: 'auto' }}>
      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          Status...
        </Typography>
        <Typography>
          {isSyncing ? `Syncing... (Attempt ${retryCount + 1}/5)` : error ? "Failed to sync data" : "Sync complete"}
        </Typography>
      </Box>
    </Paper>
  );
};

export default DataSync;