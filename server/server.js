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
const https = require('https');
const fs = require('fs');

const app = express();

const envPath = path.resolve(__dirname, '.env');
config({ path: envPath });


const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://34.135.9.49:3000';
const DOMAIN = process.env.DOMAIN || '34.135.9.49';  // Add this to your .env file
const EMAIL = process.env.EMAIL; // Add this to your .env file

// Middleware for logging request origins
app.use((req, res, next) => {
  const origin = req.get('origin') || req.get('host');
  const protocol = req.protocol;
  const port = req.socket.localPort;
  console.log(`Incoming request from: ${protocol}://${origin} to port ${port}`);
  next();
});

// increase the body parser size limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


// CORS configuration
if (NODE_ENV === 'production') {
  app.use(cors({
    origin: ALLOWED_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
} else {
  app.use(cors({
    origin: 'http://localhost:5173',
    // credentials: true, // Allow cookies and other credentials to be sent with requests
  }));
}

const options = {
  target: 'http://minio1:9000', // URL of your MinIO server
  changeOrigin: true,
  secure: NODE_ENV === 'production', // Set to true if MinIO uses HTTPS
  ws: true, // Enable WebSocket proxying
  logLevel: 'debug',
  pathRewrite: { // this is setup here to customize the url for allowing pdf/image displays in the browser
    '^/minio': '', // The '/minio' prefix is stripped off b4 sending the request
  },
};


const minioProxy = createProxyMiddleware(options);
app.use('/minio', minioProxy);


app.use("/api", controllers);


app.get('/health', (req, res) => {
  res.status(200).send('Healthy');
});


// Greenlock Express configuration
if (NODE_ENV === 'production') {
  const greenlock = require('greenlock-express').create({
    version: 'draft-11',
    configDir: './greenlock.d',
    server: 'https://acme-v02.api.letsencrypt.org/directory',
    approveDomains: (opts, certs, cb) => {
      if (certs) {
        opts.domains = [DOMAIN];
      } else {
        opts.email = EMAIL;
        opts.agreeTos = true;
      }
      cb(null, { options: opts, certs: certs });
    },
    app: app
  });

  // Start the HTTPS server
  greenlock.listen(80, 443);
  console.log(`HTTPS server running on port 443 in production mode!`);
} else {
  // Use regular HTTP for development
  app.listen(PORT, () => {
    console.log(`HTTP server running on port 🔑 ${PORT} in development mode!
    📭 query @ http://localhost:${PORT}/`);
  }).on('error', (error) => {
    console.error('Error during server startup:', error);
  });
}