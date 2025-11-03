<template>
  <div class="min-h-screen flex items-center justify-center p-8">
    <div class="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-8">
      <div class="flex items-center justify-between border-b pb-4 mb-6">
        <h1 class="text-4xl font-bold text-blue-600">
          {{ getTaskNameById(id) }}
        </h1>
      </div>
      <ul class="space-y-4">
        <li
          v-for="(item, index) in getTaskById(id).tasks"
          :key="index"
          class="bg-gray-50 hover:bg-gray-100 p-5 rounded-xl shadow-sm transition-all"
        >
          <div class="flex justify-between items-center mb-2">
            <input type="checkbox" class="big-checkbox"></input>
            <h3 class="text-xl font-semibold text-gray-800">{{ item.name }}</h3>
            <span
              :class="item.done ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'"
              class="px-3 py-1 rounded-full text-sm font-semibold"
            >
              {{ knowifdone(item) }}
            </span>
          </div>

          <p v-if="item.desc" class="text-gray-600 mb-3 pl-2 italic">
            {{ item.desc }}
          </p>

          <ul v-if="item.subtasks && item.subtasks.length" class="pl-6 border-l-2 border-blue-200 mt-3 space-y-2">
            <li
              v-for="(sub, subIndex) in item.subtasks"
              :key="subIndex"
              class="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm hover:bg-blue-50 transition-all"
            >
              <div>
                <input type="checkbox" class="font-medium text-gray-800"> {{ sub.name }}</input>
                <p v-if="sub.desc" class="text-sm text-gray-600 italic">{{ sub.desc }}</p>
              </div>
              <span
                :class="sub.done ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'"
                class="px-2 py-1 rounded-full text-xs font-semibold"
              >
                {{ knowifdone(sub) }}
              </span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import items from '../tache.json';

export default {
  props: ['id'],

  data() {
    return {
      tasks: items,
    };
  },

  methods: {
    getTaskById(id) {
      return this.tasks.find(task => task.id === Number(id));
    },
    getTaskNameById(id) {
      const task = this.getTaskById(id);
      return task ? task.name : 'Non trouvé';
    },
    knowifdone(task) {
      return task.done ? 'Fini' : 'Pas fini';
    },
  },
};
</script>

<style scoped>
li:hover {
  transform: translateY(-2px);
}

.big-checkbox {
  transform: scale(1.8);
  padding: 6px;
}

</style>
