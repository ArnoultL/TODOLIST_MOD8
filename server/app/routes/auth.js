const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const User = db.user;
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body
  try {
    // Verify if user exists
    const [rows] = await db.query('SELECT * FROM users WHERE username=?', [username])
    if (rows.length) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hashed password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert in base
    const [result] = await db.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    )

    // Token generation after inscription
    const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.json({ token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error registering user' })
  }
})

router.post('/login', async (req,res)=>{
  const {username,password} = req.body;
  const [rows] = await db.query("SELECT * FROM users WHERE username=?",[username]);
  if(rows.length===0) return res.status(401).send("Invalid");
  const user = rows[0];
  const match = await bcrypt.compare(password,user.password);
  if(!match) return res.status(401).send("Invalid");
  const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:"1h"});
  res.cookie("token", token, {httpOnly: true, secure: false});
  res.json({message: "Welcome"});
});



router.get('/logout', async(req, res)=>{
  res.cookie('jwt','',{mawAge: 0})
  res.send({
    message: 'succes'
  })
})

module.exports = router;