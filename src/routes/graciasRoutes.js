// src/routes/gracias.js
const express = require("express");
const router = express.Router();
const path = require("path");
const graciasController = require("../controllers/graciasController");

router.get("/", graciasController.getAll);

module.exports = router;
