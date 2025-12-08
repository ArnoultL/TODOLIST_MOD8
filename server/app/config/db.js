const mysql = require('mysql2');
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
module.exports = pool.promise();