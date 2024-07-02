// const ProductoModel = require('./productosModel');
const pool = require("../../utils/dbPool");
const ProductoModel = require("./productosModel");

class CalcomaniaModel extends ProductoModel {
  
  static async getAll() {
    // await initializeConnection();
    const sql = `
      SELECT
          p.id AS producto_id,
          p.nombre AS nombre,
          p.precio AS precio,
          p.descripción AS descripcion,
          p.tipo AS tipo,
          GROUP_CONCAT(DISTINCT pi.imagen) AS imagenes,
          ca.medida AS medida,
          ca.cantidad AS cantidad
      FROM
          Producto p
      LEFT JOIN
          Productos_imagenes pi ON p.id = pi.producto_id
      LEFT JOIN
          Calcomanía ca ON p.id = ca.calcamonia_id
      WHERE
          p.tipo = 'calcomanias' 
      GROUP BY
          p.id
    `;
    const [result] = await pool.query(sql);
    return result;
  }
  static async getById(id) {
    // await initializeConnection();
    const sql = `
      SELECT
          p.id AS producto_id,
          p.nombre AS nombre,
          p.precio AS precio,
          p.descripción AS descripcion,
          p.tipo AS tipo,
          GROUP_CONCAT(DISTINCT pi.imagen) AS imagenes,
          ca.medida AS medida,
          ca.cantidad AS cantidad
      FROM
          Producto p
      LEFT JOIN
          Productos_imagenes pi ON p.id = pi.producto_id
      LEFT JOIN
          Calcomanía ca ON p.id = ca.calcamonia_id
      WHERE
          p.tipo = 'calcomanias' AND p.id = ?
      GROUP BY
          p.id
    `;
    const [result] = await pool.query(sql , [id]);
    return result;
  }

  static async create({ nombre, precio, descripcion, imagenes, medida, cantidad }) {
    const producto = await super.create({ nombre, precio, descripcion, tipo: 'calcomanias', imagenes });

    const sql = `
      INSERT INTO Calcomanía (calcamonia_id, medida, cantidad)
      VALUES (?, ?, ?)
    `;
    await pool.query(sql, [producto.producto_id, medida, cantidad]);

    return this.getById(producto.producto_id);
  }

  static async update(id, { nombre, precio, descripcion, imagenes, medida, cantidad }) {
    await super.update(id, { nombre, precio, descripcion, tipo: 'calcomanias', imagenes });

    const sql = `
      UPDATE Calcomanía
      SET medida = ?, cantidad = ?
      WHERE calcamonia_id = ?
    `;
    await pool.query(sql, [medida, cantidad, id]);

    return this.getById(id);
  }

  static async delete(id) {
    await initializeConnection();

    const sql = `
      DELETE FROM Calcomanía
      WHERE calcamonia_id = ?
    `;
    await pool.query(sql, [id]);

    return super.delete(id);
  }
}

module.exports = CalcomaniaModel;
