const pool = require("../../utils/dbPool");

class ProductoModel {
  static async getAll({ tipos } = {}) {
    // console.log(tipos);
    if (tipos && tipos.length > 0) {
      const products = [];
  
      for (const tipo of tipos) {
        switch (tipo) {
          case "calcomanias":
            const calcomanias = await require("./calcomaniaModel").getAll();
            products.push(...calcomanias);
            break;
          case "remeras":
            const remeras = await require("./remeraModel").getAll();
            products.push(...remeras);
            break;
          case "cervezas":
            const cervezas = await require("./cervezasModel").getAll();
            products.push(...cervezas);
            break;
          default:
            // Si se proporciona un tipo no reconocido, se ignora o maneja según tu lógica
            break;
        }
      }
  
      return products;
    } else {
      // Si no se proporcionan tipos, obtener todos los productos de todos los tipos
      const calcomanias = await require("./calcomaniaModel").getAll();
      const remeras = await require("./remeraModel").getAll();
      const cervezas = await require("./cervezasModel").getAll();
  
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
      case "calcomanias":
        producto = await CalcomaniaModel.getById(id);
        break;
      case "remeras":
        producto = await RemeraModel.getById(id);
        break;
      case "cervezas":
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

  static async create({ nombre, precio, descripción, tipo, imagenes }) {
    //  console.log(nombre,precio, descripción, tipo, imagenes);
    // await initializepool();
    const sql = `
      INSERT INTO Producto (nombre, precio, descripción, tipo)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, [nombre, precio, descripción, tipo]);
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

  static async update(id, fieldsToUpdate) {
    try {
      // Extraer las propiedades del objeto fieldsToUpdate
      const keys = Object.keys(fieldsToUpdate);
      if (keys.length === 0) {
        throw new Error("No fields to update");
      }
  
      // Construir dinámicamente la consulta SQL solo con los campos proporcionados
      const setClause = keys.map(key => `${key} = ?`).join(", ");
      const params = keys.map(key => fieldsToUpdate[key]);
  
      const sql = `
        UPDATE Producto
        SET ${setClause}
        WHERE id = ?
      `;
      params.push(id);
  
      await pool.query(sql, params);
  
      // Manejar las imágenes si se proporcionan
      if (fieldsToUpdate.imagenes && fieldsToUpdate.imagenes.length > 0) {
        const deleteImagenesSql = `
          DELETE FROM Productos_imagenes
          WHERE producto_id = ?
        `;
        await pool.query(deleteImagenesSql, [id]);
  
        const insertImagenesSql = `
          INSERT INTO Productos_imagenes (producto_id, imagen)
          VALUES ${fieldsToUpdate.imagenes.map(() => "(?, ?)").join(", ")}
        `;
        const imagenesParams = [];
        fieldsToUpdate.imagenes.forEach(imagen => {
          imagenesParams.push(id, imagen);
        });
        await pool.query(insertImagenesSql, imagenesParams);
      }
  
      return this.getById(id);
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }
  
  

  static async delete(id) {
    const tipoProducto = await this.getTipoProductoById(id);
    // Función para eliminar imágenes relacionadas y el producto de la tabla principal
    const eliminarProductoYImagenes = async (id) => {
        const deleteImagenesSql = `
            DELETE FROM Productos_imagenes
            WHERE producto_id = ?
        `;
        await pool.query(deleteImagenesSql, [id]);

        const deleteProductoSql = `
            DELETE FROM Producto
            WHERE id = ?
        `;
        await pool.query(deleteProductoSql, [id]);
    };

    switch (tipoProducto) {
        case "calcomanias":
            await require("./calcomaniaModel").delete(id);
            break;

        case "remeras":
            await require("./remeraModel").delete(id);
            break;

        case "cervezas":
            await require("./cervezasModel").delete(id);
            break;

        default:
            throw new Error("Tipo de producto no válido");
    }

    await eliminarProductoYImagenes(id);
    return true;
}
}

module.exports = ProductoModel;
