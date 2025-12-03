require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Import des routes
const authRoutes = require('./app/routes/auth');
const taskRoutes = require('./app/routes/tasks');

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));