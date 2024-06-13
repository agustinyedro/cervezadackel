const express = require('express');
const ProductoController = require('../controllers/productoController');
const router = express.Router();

router.get('/', ProductoController.getAll);
router.post('/', ProductoController.create);

router.route('/:id')
    .get(ProductoController.getById)
    .delete(ProductoController.delete)
    .put(ProductoController.update);

module.exports = router;

