const mysql = require("mysql2/promise");
const config = require("./configDB");

const pool = mysql.createPool(config);

module.exports = pool;
