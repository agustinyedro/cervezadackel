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
          c.calibre AS calibre,
          c.estilo AS estilo,
          c.ibu AS ibu,
          c.cantidad AS cantidad,
          c.alcohol AS alcohol,
          GROUP_CONCAT(DISTINCT cp.premio) AS premios
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
    // console.log(nombre,
    //   precio,
    //    descripción,
    //   imagenes,
    //   calibre,
    //   estilo,
    //   ibu,
    //   cantidad,
    //   alcohol,
    //   premios);
    const producto = await super.create({
      nombre,
      precio,
      descripción,
      tipo: "cervezas",
      imagenes,
    });

    // console.log(producto);

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
      descripcion, // Usar 'descripcion' consistentemente
      imagenes,
      calibre,
      estilo,
      ibu,
      cantidad,
      alcohol,
      premios,
    }
  ) {
    try {
      // Actualiza los datos comunes del producto
      const commonFieldsToUpdate = { nombre, precio, descripcion };
      const commonSetClause = [];
      const commonParams = [];
  
      Object.keys(commonFieldsToUpdate).forEach((key) => {
        if (commonFieldsToUpdate[key] !== undefined) {
          commonSetClause.push(`${key} = ?`);
          commonParams.push(commonFieldsToUpdate[key]);
        }
      });
  
      if (commonSetClause.length > 0) {
        commonSetClause.push(`tipo = ?`);
        commonParams.push("cervezas");
        commonParams.push(id);
  
        const commonSql = `
          UPDATE Producto
          SET ${commonSetClause.join(", ")}
          WHERE id = ?
        `;
        await pool.query(commonSql, commonParams);
      }
  
      // Actualiza los datos específicos de la cerveza
      const cervezaFieldsToUpdate = { calibre, estilo, ibu, cantidad, alcohol };
      const cervezaSetClause = [];
      const cervezaParams = [];
  
      Object.keys(cervezaFieldsToUpdate).forEach((key) => {
        if (cervezaFieldsToUpdate[key] !== undefined) {
          cervezaSetClause.push(`${key} = ?`);
          cervezaParams.push(cervezaFieldsToUpdate[key]);
        }
      });
  
      if (cervezaSetClause.length > 0) {
        cervezaParams.push(id);
        const updateCervezaSql = `
          UPDATE Cerveza
          SET ${cervezaSetClause.join(", ")}
          WHERE id = ?
        `;
        await pool.query(updateCervezaSql, cervezaParams);
      }
  
      // Maneja las imágenes si se proporcionan
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
  
      // Maneja los premios asociados a la cerveza
      if (premios && premios.length) {
        const deletePremiosSql = `
          DELETE FROM Cerveza_premios
          WHERE cerveza_id = ?
        `;
        await pool.query(deletePremiosSql, [id]);
  
        const insertPremiosSql = `
          INSERT INTO Cerveza_premios (cerveza_id, premio)
          VALUES ${premios.map(() => "(?, ?)").join(", ")}
        `;
        const premiosParams = [];
        premios.forEach((premio) => {
          premiosParams.push(id, premio);
        });
        await pool.query(insertPremiosSql, premiosParams);
      }
  
      // Retorna los datos actualizados del producto
      return this.getById(id);
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
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
