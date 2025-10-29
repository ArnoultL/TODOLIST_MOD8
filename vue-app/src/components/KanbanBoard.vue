<template>
    <div class="kanban-board">
      <div
        v-for="column in columns"
        :key="column.id"
        class="column"
      >
        <h3>{{ column.name }}</h3>
        <draggable
          v-model="column.tasks"
          group="tasks"
          class="task-list"
        >
          <template #item="{ element }">
            <div class="task-card">
              {{ element.name }}
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </template>
  <script>
  import draggable from 'vuedraggable';
  
  export default {
    components: {
      draggable,
    },
    data() {
      return {
        columns: [
          { id: 1, name: 'À faire', tasks: [{ id: 1, name: 'Tâche 1' }] },
          { id: 2, name: 'En cours', tasks: [] },
          { id: 3, name: 'Terminé', tasks: [] },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .kanban-board {
    display: flex;
  }
  .task-list {
    flex: 1;
    margin: 10px;
    padding: 10px;
    background-color: #f0f0f0;
    min-height: 200px;
  }
  .task-card {
    background-color: #fff;
    padding: 10px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
    cursor: grab;
  }
  </style>
  