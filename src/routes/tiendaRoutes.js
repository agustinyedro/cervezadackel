// src/routes/tienda.js
const express = require('express');
const router = express.Router();

const path = require('path');
router.get('/', (req, res) => {
    res.sendFile('tienda.html', { root: path.join(__dirname, '../views') });
});

module.exports = router;
