const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../models');
const { Task } = db;
const router = express.Router();

// Middleware d'authentification
function auth(req, res, next) {
  let token = req.headers['authorization'];
  if (!token) return res.status(403).send("No token");
  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send("Invalid token");
    req.userId = decoded.id;
    next();
  });
}

// Fonction récursive pour charger l'arbre complet des sous-tâches
async function loadTaskTree(tasks) {
  const result = [];
  for (const task of tasks) {
    const taskObj = task.toJSON();

    // Charger récursivement les sous-tâches
    const subtasks = await Task.findAll({
      where: { parentTaskId: task.id },
      order: [['position', 'ASC']]
    });

    if (subtasks.length > 0) {
      taskObj.subtasks = await loadTaskTree(subtasks);
    } else {
      taskObj.subtasks = [];
    }

    result.push(taskObj);
  }
  return result;
}

// ============================================
// ROUTES POUR LES TÂCHES
// ============================================

// GET toutes les tâches racines de l'utilisateur (avec arbre complet)
router.get('/', auth, async (req, res) => {
  try {
    const rootTasks = await Task.findAll({
      where: {
        userId: req.userId,
        parentTaskId: null // Seulement les tâches racines (niveau 0)
      },
      order: [['position', 'ASC']]
    });

    // Charger récursivement toutes les sous-tâches
    const tasksWithTree = await loadTaskTree(rootTasks);

    res.json(tasksWithTree);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// GET une tâche spécifique avec ses sous-tâches
router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const taskObj = task.toJSON();

    // Charger les sous-tâches
    const subtasks = await Task.findAll({
      where: { parentTaskId: task.id },
      order: [['position', 'ASC']]
    });

    taskObj.subtasks = await loadTaskTree(subtasks);

    res.json(taskObj);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching task' });
  }
});

// POST créer une nouvelle tâche
router.post('/', auth, async (req, res) => {
  const { name, description, priority, importance, position, parentTaskId } = req.body;

  try {
    let level = 0;

    // Si la tâche a un parent, calculer le niveau
    if (parentTaskId) {
      const parentTask = await Task.findOne({
        where: {
          id: parentTaskId,
          userId: req.userId
        }
      });

      if (!parentTask) {
        return res.status(404).json({ message: 'Parent task not found' });
      }

      level = parentTask.level + 1;

      // Vérifier la limite d'imbrication (3 niveaux = 0, 1, 2)
      if (level > 2) {
        return res.status(400).json({
          message: 'Maximum nesting level reached (3 levels maximum)'
        });
      }
    }

    const task = await Task.create({
      name: name || 'New Task',
      description,
      priority: priority || 'medium',
      importance: importance || 'Medium',
      position: position !== undefined ? position : 0,
      level,
      userId: req.userId,
      parentTaskId: parentTaskId || null,
      done: false
    });

    const taskObj = task.toJSON();
    taskObj.subtasks = [];

    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Error creating task' });
  }
});

// PUT mettre à jour une tâche
router.put('/:id', auth, async (req, res) => {
  const { name, description, done, priority, importance, position, parentTaskId } = req.body;

  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Mettre à jour les champs
    if (name !== undefined) task.name = name;
    if (description !== undefined) task.description = description;
    if (done !== undefined) task.done = done;
    if (priority !== undefined) task.priority = priority;
    if (importance !== undefined) task.importance = importance;
    if (position !== undefined) task.position = position;

    // Si on change le parent
    if (parentTaskId !== undefined) {
      if (parentTaskId === null) {
        // Déplacer vers la racine
        task.parentTaskId = null;
        task.level = 0;
      } else {
        // Vérifier que le nouveau parent existe
        const newParent = await Task.findOne({
          where: {
            id: parentTaskId,
            userId: req.userId
          }
        });

        if (!newParent) {
          return res.status(404).json({ message: 'New parent task not found' });
        }

        // Vérifier qu'on ne crée pas de cycle
        if (parentTaskId === task.id) {
          return res.status(400).json({ message: 'A task cannot be its own parent' });
        }

        const newLevel = newParent.level + 1;

        // Vérifier la limite d'imbrication
        if (newLevel > 2) {
          return res.status(400).json({
            message: 'Maximum nesting level reached (3 levels maximum)'
          });
        }

        task.parentTaskId = parentTaskId;
        task.level = newLevel;
      }
    }

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task' });
  }
});

// DELETE supprimer une tâche (et toutes ses sous-tâches en cascade)
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await Task.destroy({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    if (result === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task' });
  }
});

module.exports = router;
