const CervezaModel = require('../models/mysql/cervezasModel');

class CervezaController {
  static async getAll(req, res) {
    const cervezas = await CervezaModel.getAll();
    res.json(cervezas);
  }

  static async getById(req, res) {
    const { id } = req.params;
    try {
      const cerveza = await CervezaModel.getById(id);
      res.json(cerveza);
    } catch (error) {
      res.status(404).json({ message: "Cerveza no encontrada" });
    }
  }

  static async create(req, res) {
    const { nombre, precio, descripción, imagenes, calibre, estilo, ibu, cantidad, alcohol, premios } = req.body;
    try {
      const newCerveza = await CervezaModel.create({ nombre, precio, descripción, imagenes, calibre, estilo, ibu, cantidad, alcohol, premios });
      res.status(201).json(newCerveza);
    } catch (error) {
      res.status(500).json({ error: "Error al crear la cerveza" });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const updatedCerveza = await CervezaModel.update(id, updateData);
      res.json(updatedCerveza);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar la cerveza" });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      await CervezaModel.delete(id);
      res.json({ message: "Cerveza eliminada" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la cerveza" });
    }
  }
}

module.exports = CervezaController;
