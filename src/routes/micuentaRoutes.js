// src/routes/micuenta.js
const express = require("express");
const router = express.Router();
const micuentaController = require("../controllers/micuentaController");
const path = require("path");
// const authMiddleware = require("../middlewares/authMiddleware");

// router.use(authMiddleware);

router.get("/usuarios", micuentaController.getAll);
router.get("/protegido", micuentaController.protected);
router.get("/:username", micuentaController.getByUsername);
router.get("/", micuentaController.ingresar);
router.post("/login", micuentaController.login);
router.post("/register", micuentaController.create);
router.post("/logout", micuentaController.logout);

router
  .route("/:id")
  .get(micuentaController.getById)
  .delete(micuentaController.delete)
  .patch(micuentaController.update);

// .delete(micuentaController.delete)
// .patch(micuentaController.update);

module.exports = router;
