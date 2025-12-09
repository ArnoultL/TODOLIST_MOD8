require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

// Middlewares
app.use(cors({origin: 'http://localhost:5173', credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 5001;

// Import des modeles Sequelize
const db = require('./app/models');

const authRoutes = require('./app/routes/auth');
const taskRoutes = require('./app/routes/tasks');

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Synchronisation de la base de données et demarrage du serveur
db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });
