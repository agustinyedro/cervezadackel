const pool = require("../../utils/dbPool");

class contactoModel {
  static async getAll({ motivo, medio } = {}) {
    // Construir la consulta base
    let sql =
      "SELECT id_consulta, nombre, email, telefono, motivo, mensage, medio FROM Consulta";
    const queryParams = [];

    // Agregar filtros si se proporcionan
    if (motivo || medio) {
      sql += " WHERE";
      if (motivo) {
        sql += " motivo = ?";
        queryParams.push(motivo);
      }
      if (medio) {
        if (queryParams.length > 0) {
          sql += " AND";
        }
        sql += " medio = ?";
        queryParams.push(medio);
      }
    }

    // Ejecutar la consulta
    const [result] = await pool.query(sql, queryParams);
    return result;
  }
  static async getById({ id }) {
    
    const [result] = await pool.query(
      "SELECT * FROM Consulta WHERE id_consulta = ?",
      [id]
    );

    if (result.length === 0) {
      return null;
    }
    return result[0];
  }

  static async create({ input }) {
    
    const { nombre, email, telefono, motivo, mensage, medio } = input;
    const [result] = await pool.query(
      "INSERT INTO Consulta ( nombre, email, telefono, motivo, mensage, medio) VALUES ( ?, ?, ?, ?, ?, ?)",
      [nombre, email, telefono, motivo, mensage, medio]
    );
    return result.insertId;
  }

  static async delete({ id }) {
    const [result] = await pool.query(
      "DELETE FROM Consulta WHERE id_consulta = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = contactoModel;
