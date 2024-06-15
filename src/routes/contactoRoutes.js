// src/routes/contacto.js
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile('contacto.html', { root: path.join(__dirname, '../views') });
});

router.post('/', (req, res) => {
    res.sendFile('gracias.html', { root: path.join(__dirname, '../views') });
});

module.exports = router;
