const RemeraModel = require('../models/mysql/remeraModel');

class RemeraController {
  static async getAll(req, res) {
    const remeras = await RemeraModel.getAll();
    res.json(remeras);
  }

  static async getById(req, res) {
    const { id } = req.params;
    try {
      const remera = await RemeraModel.getById(id);
      res.json(remera);
    } catch (error) {
      res.status(404).json({ message: "Remera no encontrada" });
    }
  }

  static async create(req, res) {
    const { nombre, precio, descripcion, imagenes, talla, color } = req.body;
    try {
      const newRemera = await RemeraModel.create({ nombre, precio, descripcion, imagenes, talla, color });
      res.status(201).json(newRemera);
    } catch (error) {
      res.status(500).json({ error: "Error al crear la remera" });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const updatedRemera = await RemeraModel.update(id, updateData);
      res.json(updatedRemera);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar la remera" });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      await RemeraModel.delete(id);
      res.json({ message: "Remera eliminada" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la remera" });
    }
  }
}

module.exports = RemeraController;
