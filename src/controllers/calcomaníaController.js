const CalcomaniaModel = require('../models/mysql/calcomaniaModel');

class CalcomaniaController {
  static async getAll(req, res) {
    const calcomanias = await CalcomaniaModel.getAll();
    res.json(calcomanias);
  }

  static async getById(req, res) {
    const { id } = req.params;
    try {
      const calcomania = await CalcomaniaModel.getById(id);
      res.json(calcomania);
    } catch (error) {
      res.status(404).json({ message: "Calcomanía no encontrada" });
    }
  }

  static async create(req, res) {
    const { nombre, precio, descripcion, medida, cantidad } = req.body;
    try {
      const newCalcomania = await CalcomaniaModel.create({ nombre, precio, descripcion, medida, cantidad });
      res.status(201).json(newCalcomania);
    } catch (error) {
      res.status(500).json({ error: "Error al crear la calcomanía" });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const updatedCalcomania = await CalcomaniaModel.update(id, updateData);
      res.json(updatedCalcomania);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar la calcomanía" });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      await CalcomaniaModel.delete(id);
      res.json({ message: "Calcomanía eliminada" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la calcomanía" });
    }
  }
}

module.exports = CalcomaniaController;
