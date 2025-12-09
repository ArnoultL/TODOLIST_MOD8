const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;
const authenticateToken = require('../middleware/authentificateToken');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username et password requis' });
  }

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = await User.create({
      username,
      password: hashedPassword
    });

    // Générer le token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, message: "User created successfully" });

  } catch (err) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Trouver l'utilisateur
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Comparer le mot de passe
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Générer le token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, { httpOnly: true, secure: false });
    res.json({ token: token, message: "Welcome" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/logout', async (req, res) => {
  res.cookie('token', '', { maxAge: 0 });
  res.json({
    message: 'Success'
  });
});

router.get('/', async (req, res) => {
  res.json({ message: 'Auth route is working' });
});

module.exports = router;