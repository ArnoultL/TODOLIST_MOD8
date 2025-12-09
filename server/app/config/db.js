const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  'root',
  process.env.DB_PASS,
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test de connexion
sequelize.authenticate()
  .then(() => {
    // Connected to database
  })
  .catch(err => {
    console.error("Error DB:", err.message);
  });

module.exports = sequelize;
