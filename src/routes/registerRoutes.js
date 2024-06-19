// src/routes/register.js
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile('register.html', { root: path.join(__dirname, '../views') });
});

module.exports = router;
