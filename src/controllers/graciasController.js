const path = require('path');

class graciasController {
    static async getAll(req, res) {
        res.sendFile('gracias.html', { root: path.join(__dirname, '../views') });
    }
}

module.exports = graciasController