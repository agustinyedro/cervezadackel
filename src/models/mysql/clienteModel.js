const pool = require("../../utils/dbPool");

class clienteModel {
  static async getAll() {
    // Construir la consulta base

    const sql =
      "SELECT id,Nombre,Apellido,Email,Direccion,Ciudad, Pais,CodigoPostal,Telefono,FechaRegistro, Estado, BIN_TO_UUID(usuario_id)  user_id FROM Clientes";
    // Ejecutar la consulta
    const [result] = await pool.query(sql);
    return result;
  }
  static async getById({ id }) {
    const [result] = await pool.query(
      "SELECT id,Nombre,Apellido,Email,Direccion,Ciudad, Pais,CodigoPostal,Telefono,FechaRegistro, Estado, BIN_TO_UUID(usuario_id)  user_id  FROM Clientes WHERE id = ?",
      [id]
    );

    if (result.length === 0) {
      return null;
    }
    return result[0];
  }

  static async getByUser({ user_id }) {
    const [result] = await pool.query(
      "SELECT id,Nombre,Apellido,Email,Direccion,Ciudad, Pais,CodigoPostal,Telefono,FechaRegistro, Estado, BIN_TO_UUID(usuario_id)  user_id FROM Clientes WHERE usuario_id = UUID_TO_BIN(?)",
      [user_id]
    );

    if (result.length === 0) {
      return null;
    }
    return result[0];
  }

  static async create({ input }) {
    const { Nombre, Apellido, Email, Direccion, Ciudad, Pais, CodigoPostal, Telefono, Estado, usuario_id } = input;
    // console.log("Datos de entrada:", input);
    
    try {
      const [result] = await pool.query(
        `INSERT INTO Clientes (Nombre, Apellido, Email, Direccion, Ciudad, Pais, CodigoPostal, Telefono, Estado, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, UUID_TO_BIN(?))`,
        [Nombre, Apellido, Email, Direccion, Ciudad, Pais, CodigoPostal, Telefono, Estado,usuario_id]
      );

      return result.insertId;
    } catch (error) {
      console.error("Error al insertar el cliente:", error);
      throw error;
    }
  }

  static async delete({ id }) {
    const [result] = await pool.query(
      "DELETE FROM Consulta WHERE id_consulta = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}

//
// Configurar metodo Para implementar el método estático findByIdAndDelete en el modelo clienteModel para 
//eliminar en la BBDD utilizando un id 

//falta completar Primero el usuario_id y despues el id




module.exports = clienteModel;
