const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const authenticateToken = require('../middleware/authentificateToken');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username et password requis' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM user WHERE username=?', [username]);
    
    if (rows.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      'INSERT INTO user (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );

    const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, message: "User created" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user' });
  }
});

router.post('/login', async (req,res)=>{
  const {username,password} = req.body;
  
  try {
      const [rows] = await db.query("SELECT * FROM user WHERE username=?",[username]);
      
      if(rows.length===0) return res.status(401).json({message: "Invalid credentials"});
      
      const user = rows[0];
      const match = await bcrypt.compare(password,user.password);
      
      if(!match) return res.status(401).json({message: "Invalid credentials"});
      
      const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:"1h"});
      
      res.cookie("token", token, {httpOnly: true, secure: false});
      res.json({ token: token, message: "Welcome"});
      
  } catch (err) {
      console.error(err);
      res.status(500).json({message: "Server error"});
  }
});

router.get('/logout', async(req, res)=>{
  res.cookie('token', '', { maxAge: 0 });
  res.json({
    message: 'Success'
  });
});

router.get('/', async (req, res) => {
  res.json({ message: 'Auth route is working' });
});
module.exports = router;