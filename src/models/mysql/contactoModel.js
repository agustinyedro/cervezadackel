const mysql = require("mysql2/promise");
/* https://www.clever-cloud.com */
const config = {
  host: "bwjmdpdj9q7rrxqh1rfb-mysql.services.clever-cloud.com",
  port: 3306,
  user: "ubuscb4oypdelyce",
  password: "SFHTspAPvwYLzgUoFyrI.-",
  database: "bwjmdpdj9q7rrxqh1rfb",
};

async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection(config);
    console.log("Conexión exitosa a la base de datos");
    return connection;
  } catch (error) {
    console.error("Error al conectar a la base de datos:");
    throw error;
  }
}

module.exports = connectToDatabase;

class contactoModel {
  static async getAll({ genre }) {
    const conn = await connectToDatabase();
    const result = await conn.query(
      "SELECT id_consulta, nombre, email, telefono, motivo, mensage, medio FROM Consulta;"
    );
    console.log(result);
    // return result
  }

  static async getById({ id }) {}

  static async create({ input }) {}

  static async delete({ id }) {}

  static async update({ id, input }) {}
}

module.exports = contactoModel;
