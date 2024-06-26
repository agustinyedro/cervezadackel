require("dotenv").config();

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

// Validar que todas las variables de entorno necesarias están definidas
for (const [key, value] of Object.entries(config)) {
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
}

module.exports = config;
