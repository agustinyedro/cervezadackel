const ProductoModel = require("../models/productos");
// const { validateMovie, validatePartialMovie } = require('../schemas/producto');

class ProductoController {
  static async getAll(req, res) {
    const { tipo } = req.query;
    const productos = await ProductoModel.getAll({ tipo });
    res.json(productos);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const producto = await ProductoModel.getById({ id });
    if (producto) return res.json(producto);
    res.status(404).json({ message: "Producto no encontrado" });
  }

  static async create(req, res) {
    // const result = validateMovie(req.body);

    // if (!result.success) {
    //     // 422 Unprocessable Entity
    //     return res.status(400).json({ error: JSON.parse(result.error.message) });
    // }

    // console.log(req.body);
    const newProducto = await ProductoModel.create({ input: req.body });

    res.status(201).json(newProducto);
  }

  static async delete(req, res) {
    const { id } = req.params;
    console.log(id);
    const result = await ProductoModel.delete({ id });
    // console.log(result);
    if (result === false) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.json({ message: "Producto eliminado" });
  }

  static async update(req, res) {
    const { id } = req.params;

    const updatedProducto = await ProductoModel.update({
      id,
      input: req.body,
    });

    return res.json(updatedProducto);
  }
}

module.exports = ProductoController;
