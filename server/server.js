/**
 * Express server configuration module.
 * @module server
 */

const express = require('express');
const path = require('path');
const cors = require('cors');
const { config } = require('dotenv');
const controllers = require('./controllers/index.js');
const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * Express application instance.
 * @type {import('express').Application}
 */
const app = express();

/**
 * Load environment variables from .env file.
 * @type {string}
 */
const envPath = path.resolve(__dirname, '.env');
config({ path: envPath });

/**
 * Port number for the server to listen on.
 * @type {number}
 */
const PORT = process.env.PORT || 3001;

/**
 * Configure body parser with increased limit.
 */
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

/**
 * Configure CORS for the application.
 */
app.use(cors({
  origin: 'http://localhost:5173',
  // credentials: true, // Allow cookies and other credentials to be sent with requests
}));

/**
 * Proxy middleware options for MinIO.
 * @type {import('http-proxy-middleware').Options}
 */
const options = {
  target: 'http://minio1:9000', // URL of your MinIO server
  changeOrigin: true,
  secure: false, // Set to true if MinIO uses HTTPS
  ws: true, // Enable WebSocket proxying
   /**
   * Modify proxy request headers if needed.
   * @param {import('http-proxy').ProxyReq} proxyReq - The proxy request object
   * @param {import('express').Request} req - The original request object
   * @param {import('express').Response} res - The response object
   */
  onProxyReq: (proxyReq, req, res) => {
    // You can modify headers here if needed
    // For example, to add authentication headers
  },
    /**
   * Modify proxy response headers if needed.
   * @param {import('http').IncomingMessage} proxyRes - The proxy response object
   * @param {import('express').Request} req - The original request object
   * @param {import('express').Response} res - The response object
   */
  onProxyRes: (proxyRes, req, res) => {
    // You can modify response headers here if needed
  },
  logLevel: 'debug',
  pathRewrite: {
    '^/minio': '', // The '/minio' prefix is stripped off b4 sending the request
  },
};

/**
 * Create and apply the proxy middleware for MinIO.
 */
const minioProxy = createProxyMiddleware(options);
app.use('/minio', minioProxy);

/**
 * Apply API routes.
 */
app.use("/api", controllers);

/**
 * Health check endpoint.
 * @name GET/health
 * @function
 * @memberof module:server
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
app.get('/health', (req, res) => {
  res.status(200).send('Healthy');
});

/**
 * Serve static assets in production.
 */
if (process.env.NODE_ENV === 'production') {
  // Add your production-specific code here
}

/**
 * Start the server and listen on the specified port.
 * @listens {number} PORT
 */
app.listen(PORT, () => {
  console.log(`Express server running on port 🔑 ${PORT}!
  📭  query @ http://localhost:${PORT}/`);
}).on('error', (error) => {
  console.error('Error during server startup:', error);
});