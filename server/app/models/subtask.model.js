const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Subtask = sequelize.define('Subtask', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'New Subtask'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tasks',
        key: 'id'
      }
    }
  }, {
    tableName: 'subtasks',
    timestamps: true
  });

  return Subtask;
};

