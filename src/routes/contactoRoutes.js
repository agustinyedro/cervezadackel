// src/routes/contacto.js
const express = require("express");
const router = express.Router();
const path = require("path");
const contactoController = require("../controllers/contactoController");

router.get("/", contactoController.ingresar);
router.get("/contactos", contactoController.getAll);
router.post("/", contactoController.create);

router
  .route("/contactos/:id")
  .get(contactoController.getById)
  .delete(contactoController.delete);

module.exports = router;
