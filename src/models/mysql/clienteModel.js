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
    
    try {
   
      // Obtener el user_id a partir del id
      const { user_id } = await this.getById({ id });
      console.log("usuario_id", user_id);
  
      // Eliminar el registro en Clientes
      await pool.query(
        "DELETE FROM Clientes WHERE id = ?",
        [id]
      );
  
      // Eliminar el usuario en la tabla Usuario
      const [result] = await pool.query(
        "DELETE FROM Usuario WHERE usuario_id = UUID_TO_BIN(?)",
        [user_id]
      );
  
      return result.affectedRows > 0;
    } catch (error) {
      // Revertir la transacción en caso de error
      
      console.error("Error al borrar el cliente:", error);
      throw error;
    } 
  }
}

module.exports = clienteModel;
