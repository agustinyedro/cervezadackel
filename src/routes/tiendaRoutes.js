// src/routes/tienda.js
const express = require('express');
const router = express.Router();
const tiendaController = require('../controllers/tiendaController');


router.get('/', tiendaController.obtenerTienda);

router.route('/:id')
    .get(tiendaController.obtenerDetalles);

module.exports = router;
