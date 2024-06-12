// src/routes/gracias.js
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile('gracias.html', { root: path.join(__dirname, '../views') });
});

module.exports = router;

