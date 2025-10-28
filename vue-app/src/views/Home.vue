<template>
    <KanbanBoard/>
    <draggable tag="ul" ghost-class="moving-card" class="w-full max-w-md" :list="tasks" :animation="200">
        <li v-for="task in tasks"
            :key="task.id">
            {{task.title}}
        </li>
    </draggable>
  </template>
  
  <script>
  import KanbanBoard from "../components/KanbanBoard.vue";
  import draggable from 'vuedraggable'
  
  export default {
    components: { KanbanBoard, draggable},
    data (){
        return {
            tasks : [
                { id: 1, title: "Task 1", status : "To Do"},
                { id: 2, title: "Task 2", status : "Doing"},
                { id: 3, title: "Task 3", status : "Done"},
            ]
        }
    },
  };

  </script>
  <style>
  .moving-card {
    opacity: 0.5;
    background-color: #f3f4f6;
    border: 1px solid #3b82f6;
  }
  </style>