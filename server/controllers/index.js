/**
 * Express router
 */
const express = require('express');
const router = express.Router();
const DBPosts = require('./api/minioPost')
const DBGets = require('./api/minioGet')
const DBDelete = require('./api/minioDelete')

router.use('/minioP', DBPosts)
router.use('/minioG', DBGets)
router.use('/minioD', DBDelete)

router.use((req,res) =>{
    res.send(`${req.url} ❗❗ We missed the router ❗❗Incoming request: ${req.method} `)
})

module.exports = router;