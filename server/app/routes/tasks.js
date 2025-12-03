const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();

function auth(req,res,next){
  const token = req.headers['authorization'];
  if(!token) return res.status(403).send("No token");
  jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
    if(err) return res.status(403).send("Invalid token");
    req.userId = decoded.id;
    next();
  });
}

router.get('/',auth, async (req,res)=>{
  const [rows] = await db.query("SELECT * FROM tasks WHERE user_id=?",[req.userId]);
  res.json(rows);
});

router.post('/',auth, async (req,res)=>{
  const {title,status} = req.body;
  await db.query("INSERT INTO tasks (user_id,title,status) VALUES (?,?,?)",[req.userId,title,status]);
  res.send("Task added");
});

router.put('/:id',auth, async (req,res)=>{
  const {status} = req.body;
  await db.query("UPDATE tasks SET status=? WHERE id=? AND user_id=?",[status,req.params.id,req.userId]);
  res.send("Task updated");
});

router.delete('/:id',auth, async (req,res)=>{
  await db.query("DELETE FROM tasks WHERE id=? AND user_id=?",[req.params.id,req.userId]);
  res.send("Task deleted");
});

module.exports = router;