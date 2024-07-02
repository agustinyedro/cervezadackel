const pool = require("../../utils/dbPool");
const ProductoModel = require("./productosModel");

class CervezaModel extends ProductoModel {
  static async getAll() {
    const sql = `
      SELECT
          p.id AS producto_id,
          p.nombre AS nombre,
          p.precio AS precio,
          p.descripción AS descripcion,
          p.tipo AS tipo,
          GROUP_CONCAT(DISTINCT pi.imagen) AS imagenes,
          c.calibre AS cerveza_calibre,
          c.estilo AS cerveza_estilo,
          c.ibu AS cerveza_ibu,
          c.cantidad AS cerveza_cantidad,
          c.alcohol AS cerveza_alcohol,
          GROUP_CONCAT(DISTINCT cp.premio) AS cerveza_premios
      FROM
          Producto p
      LEFT JOIN
          Productos_imagenes pi ON p.id = pi.producto_id
      LEFT JOIN
          Cerveza c ON p.id = c.id
      LEFT JOIN
          Cerveza_premios cp ON c.id = cp.cerveza_id
      WHERE
          p.tipo = 'cervezas'
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
          c.calibre AS cerveza_calibre,
          c.estilo AS cerveza_estilo,
          c.ibu AS cerveza_ibu,
          c.cantidad AS cerveza_cantidad,
          c.alcohol AS cerveza_alcohol,
          GROUP_CONCAT(DISTINCT cp.premio) AS cerveza_premios
      FROM
          Producto p
      LEFT JOIN
          Productos_imagenes pi ON p.id = pi.producto_id
      LEFT JOIN
          Cerveza c ON p.id = c.id
      LEFT JOIN
          Cerveza_premios cp ON c.id = cp.cerveza_id
      WHERE
          p.tipo = 'cervezas' AND p.id = ?
      GROUP BY
          p.id
    `;
  
    const [result] = await pool.query(sql, [id]);
    return result[0];
  }

  static async create({
    nombre,
    precio,
     descripción,
    imagenes,
    calibre,
    estilo,
    ibu,
    cantidad,
    alcohol,
    premios,
  }) {
    const producto = await super.create({
      nombre,
      precio,
       descripción,
      tipo: "cervezas",
      imagenes,
    });

    const sql = `
      INSERT INTO Cerveza (id, calibre, estilo, ibu, cantidad, alcohol)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await pool.query(sql, [
      producto.producto_id,
      calibre,
      estilo,
      ibu,
      cantidad,
      alcohol,
    ]);

    if (premios && premios.length) {
      const premiosSql = `
        INSERT INTO Cerveza_premios (cerveza_id, premio)
        VALUES ${premios.map(() => "(?, ?)").join(", ")}
      `;

      const premiosParams = [];
      premios.forEach((premio) => {
        premiosParams.push(producto.producto_id, premio);
      });

      await pool.query(premiosSql, premiosParams);
    }

    return this.getById(producto.producto_id);
  }

  static async update(
    id,
    {
      nombre,
      precio,
      descripcion,
      imagenes,
      calibre,
      estilo,
      ibu,
      cantidad,
      alcohol,
      premios,
    }
  ) {
    await super.update(id, {
      nombre,
      precio,
      descripcion,
      tipo: "cerveza",
      imagenes,
    });

    const sql = `
      UPDATE Cerveza
      SET calibre = ?, estilo = ?, ibu = ?, cantidad = ?, alcohol = ?
      WHERE id = ?
    `;

    await pool.query(sql, [calibre, estilo, ibu, cantidad, alcohol, id]);

    if (premios && premios.length) {
      const deletePremiosSql = `
        DELETE FROM Cerveza_premios
        WHERE cerveza_id = ?
      `;

      await pool.query(deletePremiosSql, [id]);

      const premiosSql = `
        INSERT INTO Cerveza_premios (cerveza_id, premio)
        VALUES ${premios.map(() => "(?, ?)").join(", ")}
      `;

      const premiosParams = [];
      premios.forEach((premio) => {
        premiosParams.push(id, premio);
      });

      await pool.query(premiosSql, premiosParams);
    }

    return this.getById(id);
  }

  static async delete(id) {
    const deletePremiosSql = `
      DELETE FROM Cerveza_premios
      WHERE cerveza_id = ?
    `;

    await pool.query(deletePremiosSql, [id]);

    const sql = `
      DELETE FROM Cerveza
      WHERE id = ?
    `;

    await pool.query(sql, [id]);

    return super.delete(id);
  }
}

module.exports = CervezaModel;
