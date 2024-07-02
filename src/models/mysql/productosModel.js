const pool = require("../../utils/dbPool");

class ProductoModel {
  static async getAll({ tipo } = {}) {
    if (tipo) {
      switch (tipo) {
        case "calcomanias":
          return await require("./calcomaniaModel").getAll();
        case "remeras":
          return await require("./remeraModel").getAll();
        case "cervezas":
          return await require("./cervezasModel").getAll();
        default:
          return [];
      }
    } else {
      // const productosGenerales = await this.getGeneralProducts();
      const calcomanias = await require("./calcomaniaModel").getAll();
      // console.log(calcomanias);
      const remeras = await require("./remeraModel").getAll();
      // console.log(remeras);
      const cervezas = await require("./cervezasModel").getAll();

      // console.log(cervezas);

      return [...cervezas, ...remeras, ...calcomanias];
    }
  }

  static async getById(id) {
    const CalcomaniaModel = require("./calcomaniaModel");
    const RemeraModel = require("./remeraModel");
    const CervezaModel = require("./cervezasModel");

    const tipoProducto = await this.getTipoProductoById(id);

    // Declarar la variable para almacenar el resultado
    let producto;

    // Según el tipo de producto, realizar la consulta correspondiente
    switch (tipoProducto) {
      case 'calcomanias':
        producto = await CalcomaniaModel.getById(id);
        break;
      case 'remeras':
        producto = await RemeraModel.getById(id);
        break;
      case 'cervezas':
        producto = await CervezaModel.getById(id);
        break;
      default:
        throw new Error("Tipo de producto no válido");
    }

    // Si el producto no se encontró, lanzar un error
    if (!producto) {
      throw new Error("Producto no encontrado");
    }

    return producto;
  }

  static async getTipoProductoById(id) {
    const [rows] = await pool.execute(
      "SELECT tipo FROM Producto WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      throw new Error("Producto no encontrado");
    }

    return rows[0].tipo;
  }

  static async create({ nombre, precio, descripcion, tipo, imagenes }) {
    // await initializepool();
    const sql = `
      INSERT INTO Producto (nombre, precio, descripción, tipo)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, [
      nombre,
      precio,
      descripcion,
      tipo,
    ]);
    const producto_id = result.insertId;

    if (imagenes && imagenes.length > 0) {
      const imagenesSql = `
        INSERT INTO Productos_imagenes (producto_id, imagen)
        VALUES ${imagenes.map(() => "(?, ?)").join(", ")}
      `;
      const imagenesParams = [];
      imagenes.forEach((imagen) => {
        imagenesParams.push(producto_id, imagen);
      });
      await pool.query(imagenesSql, imagenesParams);
    }

    return this.getById(producto_id);
  }

  static async update(id, { nombre, precio, descripcion, tipo, imagenes }) {
    // await initializepool();
    const sql = `
      UPDATE Producto
      SET nombre = ?, precio = ?, descripcion = ?, tipo = ?
      WHERE id = ?
    `;
    await pool.query(sql, [nombre, precio, descripcion, tipo, id]);

    if (imagenes && imagenes.length > 0) {
      const deleteImagenesSql = `
        DELETE FROM Productos_imagenes
        WHERE producto_id = ?
      `;
      await pool.query(deleteImagenesSql, [id]);

      const insertImagenesSql = `
        INSERT INTO Productos_imagenes (producto_id, imagen)
        VALUES ${imagenes.map(() => "(?, ?)").join(", ")}
      `;
      const imagenesParams = [];
      imagenes.forEach((imagen) => {
        imagenesParams.push(id, imagen);
      });
      await pool.query(insertImagenesSql, imagenesParams);
    }

    return this.getById(id);
  }

  static async delete(id) {
    // await initializepool();
    const sql = `
      DELETE FROM Producto
      WHERE id = ?
    `;
    await pool.query(sql, [id]);

    const deleteImagenesSql = `
      DELETE FROM Productos_imagenes
      WHERE producto_id = ?
    `;
    await pool.query(deleteImagenesSql, [id]);

    return true;
  }
}

module.exports = ProductoModel;
