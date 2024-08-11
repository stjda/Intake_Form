const express = require('express');
const router = express.Router();
const { config } = require('dotenv');
config({ path: './.env' });


// 'api/minioG' endpoint
// gets from the database
router.get('/', async (req, res) => {
    const { email, password } = req.body;
    // Validate email and password
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    // Check if email is already registered
    if (userData[email]) {
        return res.status(400).json({ error: 'Email already exists' });
    }
    // Store user data
    userData[email] = { email, password };
    res.json({ message: 'User registered successfully' });
});

module.exports = router;