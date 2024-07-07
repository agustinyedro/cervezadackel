const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");


router.get("/", clienteController.getAll);
router.get("/userid/:user_id", clienteController.getByUser);
router.get("/:id", clienteController.getById);
// router.get("/contactos", clienteController.getAll);
router.post("/", clienteController.create);
// router para update
router.put("/:id", clienteController.update);

// router
//   .route("/contactos/:id")
//   .get(clienteController.getById)
//   .delete(clienteController.delete);

module.exports = router;
