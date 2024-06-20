// src/routes/nosotros.js
const express = require("express");
const router = express.Router();

const nosotrosController = require("../controllers/nosotrosController");

const path = require("path");
router.get("/", nosotrosController.getAll);

module.exports = router;
