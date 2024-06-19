const path = require('path');

class TiendaController {
    static async obtenerTienda(req, res) {
        res.sendFile('tienda.html', { root: path.join(__dirname, '../views') });
    }

    static async obtenerDetalles(req, res) {
        res.sendFile('producto.html', { root: path.join(__dirname, '../views') });
    }
}

module.exports = TiendaController