<template>
  <div class="flex flex-wrap w-full gap-4 p-4">
    <div
      v-for="column in columns"
      :key="column.id"
      class="flex flex-col bg-gray-100 rounded-md p-2 flex-1 sm:flex-none sm:w-1/3 lg:w-1/6"
    >
      <h3 class="font-bold text-center mb-2">{{ column.name }}</h3>
      <draggable
        v-model="column.tasks"
        group="tasks"
        class="flex flex-col gap-2 overflow-y-auto"
      >
        <template #item="{ element }">
          <div class="bg-white p-2 border border-gray-300 rounded cursor-grab">
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </div>
  </div>
  <Sidebar 
    :items="columns" />
</template>
<script>
import draggable from 'vuedraggable';
import Sidebar from '../components/SideBar.vue';

export default {
  components: {
    draggable,
    Sidebar
  },
  data() {
    return {
      columns: [
        { id: 1, name: 'TODO', tasks: [{ id: 1, name: 'Tâche 1' }, {id: 2, name:'Tacfsvvfvfd'}] },
        { id: 2, name: 'DOING', tasks: [{id: 1, name:'dfsfdf'}] },
        { id: 3, name: 'DONE', tasks: [] },
      ],
    };
  },
};
</script>

