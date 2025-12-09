const db = require('../models');
const { Column, Task, Subtask } = db;

/**
 * Initialise les colonnes par défaut pour un utilisateur
 * Basé sur le fichier tache.json
 */
async function initializeDefaultColumns(userId) {
  try {
    // Vérifier si l'utilisateur a déjà des colonnes
    const existingColumns = await Column.findAll({ where: { userId } });

    if (existingColumns.length > 0) {
      return existingColumns;
    }

    // Créer les colonnes par défaut
    const defaultColumns = [
      { name: 'To Sort', position: 0 },
      { name: 'TO DO', position: 1 },
      { name: 'In Progress', position: 2 },
      { name: 'Done', position: 3 }
    ];

    const createdColumns = [];

    for (const colData of defaultColumns) {
      const column = await Column.create({
        name: colData.name,
        position: colData.position,
        userId
      });
      createdColumns.push(column);
    }

    return createdColumns;
  } catch (err) {
    throw err;
  }
}

module.exports = { initializeDefaultColumns };

