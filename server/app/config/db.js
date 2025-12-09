const mysql = require('mysql2');
require('dotenv').config();
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("ERREUR DB:", err.code);
  } else {
    console.log("Connected!");
    connection.release();
  }
});

module.exports = pool.promise();