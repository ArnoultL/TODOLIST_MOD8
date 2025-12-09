const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();

function auth(req,res,next){
  let token = req.headers['authorization'];
  if(!token) return res.status(403).send("No token");
  if (token.startsWith("Bearer ")) {
    token = token.slice(7);}
  jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
    if(err) return res.status(403).send("Invalid token");
    req.userId = decoded.id;
    next();
  });
}

router.get('/',auth, async (req,res)=>{
  const [rows] = await db.query("SELECT * FROM task WHERE username=?",[req.username]);
  res.json(rows);
});

router.post('/', auth, async (req, res) => {
  const { title, priority = 'medium', status = 'todo' } = req.body
  const [result] = await db.query(
    "INSERT INTO `db_projectweb`.`task`(`task_id`, `task_name`, `date_init`, `date_limit`, `description`,`done`, `color`, `importance`, `task_id_1`, `user_username`) VALUES (?,?,NOW(),?,?,'Not Done',?,?,?,?)",//peut etre probleme avec le username
    [title, priority, status, req.username]
  )
  res.json({
    id: result.insertId,
    title,
    priority,
    status,
    done: false
  })
})


// faut refaire avec les bonne database et tout
router.put('/:id',auth, async (req,res)=>{
  const {status} = req.body;
  await db.query("UPDATE task SET status=? WHERE id=? AND user_id=?",[status,req.params.id,req.userId]);
  res.send("Task updated");
});

// même lui
router.delete('/:id',auth, async (req,res)=>{
  await db.query("DELETE FROM task WHERE id=? AND user_id=?",[req.params.id,req.userId]);
  res.send("Task deleted");
});

module.exports = router;