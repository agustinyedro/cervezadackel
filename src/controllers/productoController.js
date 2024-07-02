const ProductoModel = require("../models/mysql/productosModel");

class ProductoController {
  static async getAll(req, res) {
    try {
      const { tipo } = req.query;
      const productos = await ProductoModel.getAll({ tipo });
      res.json(productos);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      res.status(500).json({ message: "Error al obtener los productos" });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    try {
      const producto = await ProductoModel.getById(id);
      if (producto) return res.json(producto);
      res.status(404).json({ message: "Producto no encontrado" });
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      res.status(500).json({ message: "Error al obtener el producto" });
    }
  }

  static async create(req, res) {
    try {
      const { tipo, ...datos } = req.body;
      let newProducto;

      switch (tipo) {
        case 'calcomania':
          newProducto = await CalcomaniaModel.create(datos);
          break;
        case 'remera':
          newProducto = await RemeraModel.create(datos);
          break;
        case 'cerveza':
          newProducto = await CervezaModel.create(datos);
          break;
        default:
          newProducto = await ProductoModel.create(datos);
      }

      res.status(201).json(newProducto);
    } catch (error) {
      console.error("Error al crear el producto:", error);
      res.status(500).json({ message: "Error al crear el producto" });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      const result = await ProductoModel.delete(id);
      if (!result) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      res.json({ message: "Producto eliminado" });
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      res.status(500).json({ message: "Error al eliminar el producto" });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { tipo, ...datos } = req.body;
    try {
      let updatedProducto;

      switch (tipo) {
        case 'calcomania':
          updatedProducto = await CalcomaniaModel.update(id, datos);
          break;
        case 'remera':
          updatedProducto = await RemeraModel.update(id, datos);
          break;
        case 'cerveza':
          updatedProducto = await CervezaModel.update(id, datos);
          break;
        default:
          updatedProducto = await ProductoModel.update(id, datos);
      }

      res.json(updatedProducto);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      res.status(500).json({ message: "Error al actualizar el producto" });
    }
  }
}

module.exports = ProductoController;
