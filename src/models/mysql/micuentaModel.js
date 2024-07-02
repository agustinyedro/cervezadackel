const pool = require("../../utils/dbPool");
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../../utils/config");


class micuentaModel {
  static async getAll({ rol } = {}) {

    // Construir la consulta base
    let sql = "SELECT BIN_TO_UUID(usuario_id) id, username, rol FROM Usuario";
    const queryParams = [];

    // Agregar filtros si se proporcionan
    if (rol) {
      sql += " WHERE rol = ?";
      queryParams.push(rol);
    }

    // Ejecutar la consulta
    const [result] = await pool.query(sql, queryParams);
    return result;
  }
  static async getById({ id }) {
    const [result] = await pool.query(
      "SELECT BIN_TO_UUID(usuario_id) id, username, rol FROM Usuario WHERE usuario_id = UUID_TO_BIN(?)",
      [id]
    );
    if (result.length === 0) {
      return null;
    }
    return result[0];
  }
  static async getByUsuario({ username }) {
    const [result] = await pool.query(
      "SELECT BIN_TO_UUID(usuario_id) id, username, password, rol FROM Usuario WHERE username = ?",
      [username]
    );
    if (result.length === 0) {
      return null;
    }
    return result[0];
  }
  static async login({ username, password }) {
    // buscar el usuario
    const user = await this.getByUsuario({ username });

    if (!user) throw new Error("User does not exist");

    const isValid = await bcrypt.compareSync(password, user.password);
    if (!isValid) throw new Error("Invalid password");
    // console.log(user);

    const { password: _, ...publicUser } = user;
    return publicUser;
  }
  static async create({ username, password, rol }) {
    // 2. asegurar que el usuario no exista

    const user = await this.getByUsuario({ username });
    if (user) throw new Error("User already exists");
    const [uuidResult] = await pool.query("SELECT UUID() uuid;");
    const [{ uuid }] = uuidResult;
    console.log(uuid);
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // 3. Crear el usuario
    try {
      await pool.query(
        `INSERT INTO Usuario (usuario_id, username, password, rol) VALUES (UUID_TO_BIN("${uuid}"),?, ?, ?)`,
        [username, hashedPassword, rol]
      );
    } catch (error) {
      throw new Error("Error al crear el usuario");
    }

    const [result] = await pool.query(
      "SELECT BIN_TO_UUID(usuario_id) id, username, rol FROM Usuario WHERE usuario_id = UUID_TO_BIN(?)",
      [uuid]
    );

    return result;
  }
  static async delete({ id }) {
    const [result] = await pool.query(
      "DELETE FROM Usuario WHERE usuario_id = UUID_TO_BIN(?)",
      [id]
    );
    return result.affectedRows > 0;
  }
  static async update({ id, username, password, rol }) {

    const updates = [];
    const values = [];

    if (username) {
      updates.push("username = ?");
      values.push(username);
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      updates.push("password = ?");
      values.push(hashedPassword);
    }
    if (rol) {
      updates.push("rol = ?");
      values.push(rol);
    }

    if (updates.length === 0) {
      throw new Error("No fields to update");
    }

    values.push(id);

    const query = `UPDATE Usuario SET ${updates.join(
      ", "
    )} WHERE usuario_id = UUID_TO_BIN(?)`;

    try {
      const [result] = await pool.query(query, values);
      return result.affectedRows > 0;
    } catch (error) {
      // console.error("Error during update:", error);
      throw error;
    }
  }
}

module.exports = micuentaModel;
