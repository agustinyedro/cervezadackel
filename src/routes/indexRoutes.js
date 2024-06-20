// src/routes/index.js
const express = require("express");
const router = express.Router();

const path = require("path");
const indexController = require("../controllers/indexController");

router.get("/", indexController.getAll);

module.exports = router;
