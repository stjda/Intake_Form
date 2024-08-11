const express = require('express')
const path = require('path')
const cors = require('cors')
const { config } = require('dotenv');
const controllers = require('./controllers/index.js')
const envPath = path.resolve(__dirname, '.env');
config({ path: envPath });

const PORT = process.env.PORT || 3001; // Default to 3001 if process.env.PORT is not set

const app = express()
app.use(cors({
  origin: 'http://localhost:5173',
  // credentials: true, // Allow cookies and other credentials to be sent with requests
}));

app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());

app.use("/api", controllers);



(async () => {

    try {

    // Health Check Endpoint
    app.get('/health', (req, res) => {
        // Custom health checks, e.g., database connections
        res.status(200).send('Healthy');
    });

    // Serve static assets in production
    if (process.env.NODE_ENV === 'production') {
       
    }

    // Start the server
    app.listen(PORT, () => {
        console.log(`Express server running on port 🔑 ${PORT}!
        📭  query @ http://localhost:${PORT}/`);
      });     
    }

    catch (error) {
      console.error('Error during server startup:', error);
    }

})();