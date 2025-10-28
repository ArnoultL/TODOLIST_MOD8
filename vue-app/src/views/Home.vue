<template>
    <div class="p-4">
      <KanbanBoard />
    </div>
  </template>
  
  <script>
  import KanbanBoard from '../components/KanbanBoard.vue';
  
  export default {
    name: "App",
    components: {
      KanbanBoard
    }
  }
  </script>
  