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

const PORT = process.env.PORT;

// Import des routes
const authRoutes = require('./app/routes/auth');
const taskRoutes = require('./app/routes/tasks');


app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
require('./app/routes/user.route')(app)

app.listen(PORT, () =>{
    console.log(PORT);
});