require("dotenv").config();

const config = {
  PORT: process.env.PORT,
  SALT_ROUNDS: 10,
  SECRET_JWT_KEY: " this-is-an-awesome-secret-key-muchisimo-largo",
};
module.exports = config;
