// src/routes/producto.js
const express = require('express');
const router = express.Router();

const path = require('path');
router.get('/', (req, res) => {
    res.sendFile('producto.html', { root: path.join(__dirname, '../views') });
});

router.get('/:id', (req, res) => {


    res.sendFile('producto.html', { root: path.join(__dirname, '../views') });

});

module.exports = router;
