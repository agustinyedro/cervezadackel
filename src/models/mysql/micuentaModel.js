const mysql = require("mysql2/promise");

const bcrypt = require("bcrypt");

const config = {
  host: "bwjmdpdj9q7rrxqh1rfb-mysql.services.clever-cloud.com",
  port: 3306,
  user: "ubuscb4oypdelyce",
  password: "SFHTspAPvwYLzgUoFyrI",
  database: "bwjmdpdj9q7rrxqh1rfb",
};

let connection;

async function initializeConnection() {
  if (!connection) {
    try {
      connection = await mysql.createConnection(config);
      console.log("Database connection established");
    } catch (error) {
      console.error("Failed to connect to the database:", error);
      throw error; // Re-throw the error after logging it
    }
  }
}

class micuentaModel {
  static async getAll({ rol } = {}) {
    await initializeConnection();

    // Construir la consulta base
    let sql = "SELECT * FROM Usuario";
    const queryParams = [];

    // Agregar filtros si se proporcionan
    if (rol) {
      sql += " WHERE rol = ?";
      queryParams.push(rol);
    }

    // Ejecutar la consulta
    const [result] = await connection.query(sql, queryParams);
    return result;
  }

  static async getById({ id }) {
    await initializeConnection();
    const [result] = await connection.query(
      "SELECT * FROM Usuario WHERE id = ?",
      [id]
    );
    if (result.length === 0) {
      return null;
    }
    return result[0];
  }
  static async getByUsuario({ username }) {
    await initializeConnection();
    const [result] = await connection.query(
      "SELECT * FROM Usuario WHERE username = ?",
      [username]
    );
    if (result.length === 0) {
      return null;
    }
    return result[0];
  }
  static async login({ username, password }) {
    await initializeConnection();
    // buscar el usuario
    const user = await this.getByUsuario({ username });

    if (!user) throw new Error("User does not exist");

    const isValid = await bcrypt.compareSync(password, user.password);
    if (!isValid) throw new Error("Invalid password");

    const { password: _, ...publicUser } = user;
    return publicUser;
  }
  static async create({ username, password }) {
    await initializeConnection();
    // 2. asegurar que el usuario no exista

    const user = User.findOne({ username });
    if (user) throw new Error("User already exists");

    const id = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    User.create({ _id: id, username, password: hashedPassword }).save();
    return id;
  }
}

module.exports = micuentaModel;
