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
</template>
<script>
import draggable from 'vuedraggable';
import tache from '../tache.json';

export default {
  components: {
    draggable
  },
  data() {
    return {
      columns: tache,
    };
  },
};
</script>

