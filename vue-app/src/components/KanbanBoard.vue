<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Mon Kanban</h1>
      <div class="grid grid-cols-3 gap-4">
        <div v-for="col in columns" :key="col.id" class="bg-gray-100 p-4 rounded">
          <h2 class="font-bold mb-2">{{ col.title }}</h2>
          <draggable
            :list="col.tasks"
            group="tasks"
            ghost-class="moving-card"
            item-key="id"
          >
            <template #item="{ element }">
              <div class="p-3 mb-2 bg-white shadow rounded cursor-move">
                {{ element.title }}
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import draggable from "vuedraggable";
  
  export default {
    name: "KanbanBoard",
    components: { draggable },
    data() {
      return {
        columns: [
          { id: 1, title: "To Do", tasks: [{ id: 1, title: "Task 1" }, { id: 2, title: "Task 2" }] },
          { id: 2, title: "Doing", tasks: [{ id: 3, title: "Task 3" }] },
          { id: 3, title: "Done", tasks: [{ id: 4, title: "Task 4" }] },
        ],
      };
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
  