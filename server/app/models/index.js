const sequelize = require('../config/db');

const db = {};

db.Sequelize = require('sequelize');
db.sequelize = sequelize;

// Import des modèles
db.User = require('./user.model')(sequelize);
db.Task = require('./task.model')(sequelize);

// Associations
// User -> Tasks (1:N)
db.User.hasMany(db.Task, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  as: 'tasks'
});
db.Task.belongsTo(db.User, {
  foreignKey: 'userId',
  as: 'user'
});

// Task -> Subtasks (auto-référentiel, récursif)
db.Task.hasMany(db.Task, {
  foreignKey: 'parentTaskId',
  as: 'subtasks',
  onDelete: 'CASCADE'
});
db.Task.belongsTo(db.Task, {
  foreignKey: 'parentTaskId',
  as: 'parentTask'
});

module.exports = db;
