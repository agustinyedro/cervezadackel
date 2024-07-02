const express = require("express");

const ProductoController = require("../controllers/productoController");
const CervezaController = require("../controllers/cevezaController");
const CalcomaniaController = require("../controllers/calcomaníaController");
const RemeraController = require("../controllers/remeraController");


const router = express.Router();

router.get("/", ProductoController.getAll);
router.post("/cerveza", CervezaController.create);
router.post("/calcomania", CalcomaniaController.create);
router.post("/remera", RemeraController.create);

router
   .route("/:id")
   .get(ProductoController.getById)
   .delete(ProductoController.delete)
   .patch(ProductoController.update);

module.exports = router;
