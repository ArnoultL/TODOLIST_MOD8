<template>
  <div class="min-h-screen flex items-center justify-center p-8">
    <div class="bg-[#083048] xshadow-2xl rounded-2xl w-full max-w-3xl p-8">
      <div class="flex items-center justify-between border-b pb-4 mb-6">
        <h1 class="text-4xl font-bold text-[#F1ECDC]">
          {{ getTaskNameById(id) }}
        </h1>
        <bouton class="nav-buttonbis" @click="goToPage()">&times;</bouton>
      </div>
      <ul class="space-y-4">
        <li
          v-for="(item, index) in getTasksById(id).tasks"
          :key="index"
          class="bg-[#0A3F5E] hover:bg-[#0c4a6e] p-5 rounded-xl shadow-sm transition-all"
        >
          <div class="flex justify-between items-center mb-2">
            <input type="checkbox" class="big-checkbox" v-model="item.done"></input>
            <h3 class="text-xl font-semibold text-gray-200">{{ item.name }}</h3>
            <span
                  :class="{
                    'bg-red-100 text-red-600': item.importance === 'Important',
                    'bg-yellow-100 text-yellow-700': item.importance === 'Medium',
                    'bg-green-100 text-green-700': item.importance === 'Low'
                  }"
                  class="px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-3"
                >
                  {{ item.importance }}
                </span>            <span
              :class="item.done ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'"
              class="px-3 py-1 rounded-full text-sm font-semibold"
            >
              {{ knowifdone(item) }}
            </span>
          </div>

          <p v-if="item.desc" class="text-gray-100 mb-3 pl-2 italic">
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
                <p v-if="sub.desc" class="text-sm text-gray-100 italic">{{ sub.desc }}</p>
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
import store from '../store';


export default {
  props: ['id'],

  data() {
    return {
      columns: store.columns,
    };
  },

  methods: {
    getTasksById(id){
      return this.columns.find(task => task.id === Number(id));
    },
    getTaskNameById(id){
      const task = this.getTasksById(id);
      return task ? task.name : 'Not Found';
    },
    knowifdone(task){
      return task.done ? 'Done' : 'Not Done';
    },
    goToPage(){
      this.$router.push('/home')
    }
  }
}

</script>

<style scoped>
li:hover {
  transform: translateY(-2px);
}

.big-checkbox {
  transform: scale(1.8);
  padding: 6px;
}

.right{
right: 0;
margin-right: 0;
}

</style>
