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

class ProductoModel {
  static async getAll({ tipo }) {
    await initializeConnection();
    if (tipo) {
      return productos.filter(
        (producto) => producto.tipo === tipo.toLowerCase()
      );
    }

    return productos;
  }

  static async getById({ id }) {
    // Convertir id a string para asegurarse de que ambos id son del mismo tipo
    const parsedId = typeof id === "string" ? id : String(id);

    // Encontrar el producto por id
    const producto = productos.find(
      (producto) => String(producto.id) === parsedId
    );

    return producto;
  }

  static async create({ input }) {
    const newproducto = {
      id: productos.length + 1,
      ...input,
    };

    productos.push(newproducto);

    return newproducto;
  }

  static async delete({ id }) {
    const parsedId = typeof id === "string" ? id : String(id);

    const productoIndex = productos.findIndex(
      (producto) => String(producto.id) === id
    );
    // console.log(productoIndex);
    if (productoIndex === -1) return false;

    productos.splice(productoIndex, 1);
    return true;
  }

  static async update({ id, input }) {
    const parsedId = typeof id === "string" ? id : String(id);

    const productoIndex = productos.findIndex(
      (producto) => String(producto.id) === id
    );

    productos[productoIndex] = {
      ...productos[productoIndex],
      ...input,
    };

    return productos[productoIndex];
  }
}

module.exports = ProductoModel;
