const path = require("path");

class IndexController {
  static async getAll(req, res) {
    res.sendFile("index.html", { root: path.join(__dirname, "../views") });
  }
}

module.exports = IndexController;
