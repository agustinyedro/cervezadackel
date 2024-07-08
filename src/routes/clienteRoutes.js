const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");

router.get("/", clienteController.getAll);
router.get("/userid/:user_id", clienteController.getByUser);

// router.get("/contactos", clienteController.getAll);
 router.post("/", clienteController.create);

router
  .route("/:id")
  .get(clienteController.getById)
  .patch(clienteController.update)
  .delete(clienteController.delete);

module.exports = router;
