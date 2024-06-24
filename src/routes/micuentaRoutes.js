// src/routes/micuenta.js
const express = require("express");
const router = express.Router();
const micuentaController = require("../controllers/micuentaController");
const path = require("path");

router.get("/", micuentaController.ingresar);
router.get("/usuarios", micuentaController.getAll);

router
  .route("/:id")
  .get(micuentaController.getById)
  .delete(micuentaController.delete)
  .patch(micuentaController.update);

module.exports = router;
