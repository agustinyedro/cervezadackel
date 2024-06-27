const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile("micuenta2.html", { root: path.join(__dirname, "../views") });
});

router.get('/api/user', (req, res) => {
  const { user } = req.session;

  if (!user) return res.status(403).json({ error: 'Unauthorized' });

  res.json(user);
});
module.exports = router;
