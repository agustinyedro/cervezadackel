const mysql = require("mysql2/promise");

const config = require("../../utils/configDB");

let connection;

async function initializeConnection() {
  if (!connection) {
    try {
      connection = await mysql.createConnection(config);
      console.log("Base de datos conectada");
    } catch (error) {
      console.error("Error al conectar a la base de datos:", error);
      throw error; // Re-throw the error after logging it
    }
  }
}

class contactoModel {
  static async getAll({ motivo, medio } = {}) {
    await initializeConnection();

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
    const [result] = await connection.query(sql, queryParams);
    return result;
  }
  static async getById({ id }) {
    await initializeConnection();

    const [result] = await connection.query(
      "SELECT * FROM Consulta WHERE id_consulta = ?",
      [id]
    );

    if (result.length === 0) {
      return null;
    }
    return result[0];
  }

  static async create({ input }) {
    await initializeConnection();
    const { nombre, email, telefono, motivo, mensage, medio } = input;
    const [result] = await connection.query(
      "INSERT INTO Consulta ( nombre, email, telefono, motivo, mensage, medio) VALUES ( ?, ?, ?, ?, ?, ?)",
      [nombre, email, telefono, motivo, mensage, medio]
    );
    return result.insertId;
  }

  static async delete({ id }) {
    await initializeConnection();
    const [result] = await connection.query(
      "DELETE FROM Consulta WHERE id_consulta = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = contactoModel;
