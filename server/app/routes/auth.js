const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();

router.post('/register', async (req,res)=>{
  const {username,password} = req.body;
  const hash = await bcrypt.hash(password,10);
  await db.query("INSERT INTO users (username,password) VALUES (?,?)",[username,hash]);
  res.send("User registered");
});

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

router.get('/', async(req, res)=>{
  res.json({message: "hello guys"});
})

module.exports = router;