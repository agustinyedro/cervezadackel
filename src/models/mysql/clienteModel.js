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

// metodo update
static async update({Id, Nombre, Apellido, Email, Direccion, Ciudad, Pais, CodigoPostal, Telefono, Estado}) {
  // await initializeConnection();

   const updates = [];
   const values = [];
// hacer un foreach

  if (Nombre) {
      updates.push("Nombre = ?");
      values.push(Nombre);
  }
  if (Apellido) {
      updates.push("Apellido = ?");
      values.push(Apellido);
  }
  if (Email) {
      updates.push("Email = ?");
      values.push(Email);
  }
  if (Direccion) {
      updates.push("Direccion = ?");
      values.push(Direccion);
  }
  if (Ciudad) {
      updates.push("Ciudad = ?");
      values.push(Ciudad);
  }
  if (Pais) {
      updates.push("Pais = ?");
      values.push(Pais);
  }
  if (CodigoPostal) {
      updates.push("CodigoPostal = ?");
      values.push(CodigoPostal);
  }
  if (Telefono) {
      updates.push("Telefono = ?");
      values.push(Telefono);
  }
  if (Estado) {
      updates.push("Estado = ?");
      values.push(Estado);
  }

  if (usuario_id) {
      updates.push("usuario_id = UUID_TO_BIN(?)");
      values.push(usuario_id);
  }

  if (updates.length === 0) {
      throw new Error("No se encontró campo para actualizar");
  }

  values.push(Id);

  // const pool.query = `UPDATE Clientes SET ${updates.join(", ")} WHERE id = ?`;

  try {
      const [result] = await pool.query(
        `UPDATE Clientes SET ${updates.join(", ")} WHERE id = ?`
      );

      return result.updateId;
  } catch (error) {
      console.error("Error durante la actualización:", error);
      throw error;
  }
}

// fin metodo update



  static async delete({ id }) {
    const [result] = await pool.query(
      "DELETE FROM Consulta WHERE id_consulta = ?",
      [id]
    );
    return result.affectedRows > 0;
  }

  static async deleteUsuario(usuario_id) {
    try {
        const result = await pool.query(
            `DELETE FROM Usuarios WHERE id = ?`,
            [usuario_id]
        );
        return result.affectedRows; // Número de filas afectadas 
    } catch (error) {
        console.error("Error al borrar el usuario:", error);
        throw error;
    }
}

  static async deleteClienteByUsuarioId(usuario_id) {
    try {
      const result = await pool.query(
          `DELETE FROM Clientes WHERE usuario_id = UUID_TO_BIN(?)`,
          [usuario_id]
      );
      return result.affectedRows; // Número de filas afectadas
    } catch (error) {
      console.error("Error al borrar el cliente:", error);
      throw error;
    }
}

}

module.exports = clienteModel;
