// src/routes/contacto.js
const express = require('express');
const router = express.Router();
const path = require('path');
const contactoController = require('../controllers/contactoController');

router.get('/', contactoController.getAll);
router.post('/', contactoController.create);

router.route('/:id')
    .get(contactoController.getById)
    .delete(contactoController.delete);

module.exports = router;
