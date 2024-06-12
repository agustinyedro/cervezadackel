// src/routes/micuenta.js
const express = require('express');
const router = express.Router();

const path = require('path');
router.get('/', (req, res) => {
    res.sendFile('micuenta.html', { root: path.join(__dirname, '../views') });
});

router.get('/2', (req, res) => {
    res.sendFile('micuenta2.html', { root: path.join(__dirname, '../views') });
});

module.exports = router;
