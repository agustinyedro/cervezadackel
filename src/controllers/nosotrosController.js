const path = require("path");

class NosotrosController {
  static async getAll(req, res) {
    res.sendFile("nosotros.html", { root: path.join(__dirname, "../views") });
  }
}

module.exports = NosotrosController;
