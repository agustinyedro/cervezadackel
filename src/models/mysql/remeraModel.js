const pool = require("../../utils/dbPool");
const ProductoModel = require("./productosModel");

class RemeraModel extends ProductoModel {
    static async getAll() {
      const sql = `
        SELECT
            p.id AS producto_id,
            p.nombre AS nombre,
            p.precio AS precio,
            p.descripción AS descripcion,
            p.tipo AS tipo,
            GROUP_CONCAT(DISTINCT pi.imagen) AS imagenes,
            r.remeras_id AS remera_id,
            GROUP_CONCAT(DISTINCT CONCAT(rt.talle_nombre, ':', rc.color_nombre, ':', r.stock)) AS variantes
        FROM
            Producto p
        LEFT JOIN
            Productos_imagenes pi ON p.id = pi.producto_id
        LEFT JOIN
            Remeras r ON p.id = r.producto_id
        LEFT JOIN
            Remeras_talle rt ON r.talle_id = rt.talle_id
        LEFT JOIN
            Remeras_colors rc ON r.color_id = rc.color_id
        WHERE
            p.tipo = 'remeras'
        GROUP BY
            p.id
      `;
  
      const [result] = await pool.query(sql);
      return result;
  }
  static async getById(id) {
    const sql = `
      SELECT
          p.id AS producto_id,
          p.nombre AS nombre,
          p.precio AS precio,
          p.descripción AS descripcion,
          p.tipo AS tipo,
          GROUP_CONCAT(DISTINCT pi.imagen) AS imagenes,
          r.remeras_id AS remera_id,
          GROUP_CONCAT(DISTINCT CONCAT(rt.talle_nombre, ':', rc.color_nombre, ':', r.stock)) AS variantes
      FROM
          Producto p
      LEFT JOIN
          Productos_imagenes pi ON p.id = pi.producto_id
      LEFT JOIN
          Remeras r ON p.id = r.producto_id
      LEFT JOIN
          Remeras_talle rt ON r.talle_id = rt.talle_id
      LEFT JOIN
          Remeras_colors rc ON r.color_id = rc.color_id
      WHERE
          p.tipo = 'remeras' AND p.id = ?
      GROUP BY
          p.id
    `;

    const [result] = await pool.query(sql, [id]);
    return result;
  }
  
    static async create({ nombre, precio, descripcion, imagenes, variantes }) {
      const producto = await super.create({ nombre, precio, descripcion, tipo: 'remera', imagenes });
  
      if (variantes && variantes.length) {
        const variantesSql = `
          INSERT INTO Remeras (producto_id, talle_id, color_id, stock)
          VALUES ${variantes.map(() => '(?, ?, ?, ?)').join(', ')}
        `;
  
        const variantesParams = [];
        variantes.forEach(({ talle_id, color_id, stock }) => {
          variantesParams.push(producto.producto_id, talle_id, color_id, stock);
        });
  
        await pool.query(variantesSql, variantesParams);
      }
  
      return this.getById(producto.producto_id);
    }
  
    static async update(id, { nombre, precio, descripcion, imagenes, variantes }) {
      await super.update(id, { nombre, precio, descripcion, tipo: 'remera', imagenes });
  
      if (variantes && variantes.length) {
        const deleteVariantesSql = `
          DELETE FROM Remeras
          WHERE producto_id = ?
        `;
  
        await pool.query(deleteVariantesSql, [id]);
  
        const variantesSql = `
          INSERT INTO Remeras (producto_id, talle_id, color_id, stock)
          VALUES ${variantes.map(() => '(?, ?, ?, ?)').join(', ')}
        `;
  
        const variantesParams = [];
        variantes.forEach(({ talle_id, color_id, stock }) => {
          variantesParams.push(id, talle_id, color_id, stock);
        });
  
        await pool.query(variantesSql, variantesParams);
      }
  
      return this.getById(id);
    }
  
    static async delete(id) {
      const deleteVariantesSql = `
        DELETE FROM Remeras
        WHERE producto_id = ?
      `;
  
      await pool.query(deleteVariantesSql, [id]);
  
      return super.delete(id);
    }
  }

  module.exports = RemeraModel;