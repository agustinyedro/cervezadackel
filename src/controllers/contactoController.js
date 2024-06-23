// const contactoModel = require("../models/local-json/contactoModel");
// const { validateMovie, validatePartialMovie } = require('../schemas/producto');
const contactoModel = require("../models/mysql/contactoModel");

const path = require("path");

class contactoController {
  static async ingresar(req, res) {
    res.sendFile("contacto.html", { root: path.join(__dirname, "../views") });
  }
  static async getAll(req, res) {
    const { medio, motivo } = req.query;
    const contactos = await contactoModel.getAll({ medio, motivo });
    res.json(contactos);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const contacto = await contactoModel.getById({ id });
    if (contacto) return res.json(contacto);
    res.status(404).json({ message: "Contacto no encontrado" });
  }

  static async create(req, res) {
    // console.log("req.body", req.body);
    try {
      const newContacto = await contactoModel.create({ input: req.body });
      // console.log(req.body);
      res.status(201).json(newContacto);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el contacto" });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    // console.log(id);
    const result = await contactoModel.delete({ id });
    // console.log(result);
    if (result === false) {
      return res.status(404).json({ message: "Contacto no encontrado" });
    }

    return res.json({ message: "Contacto eliminado" });
  }
}

module.exports = contactoController;
