<template>
  <section class="home-create flex items-center mb-4">
    <form class="home-controls" @submit.prevent="create">
      <label for="home-new-task" class="sr-only">New Task</label>

      <input 
        id="home-new-task" 
        v-model="newTask" 
        placeholder="New Task..." 
        class="flex-1 px-3 py-2 rounded" 
      />
      
      <select v-model="taskPriority" class="px-3 py-2 rounded ml-2">
        <option value="high">Important</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button type="submit" class="create-btn text-white">➕ Add</button>
    </form>
  </section>

  <div id="date">
    <p>Today is : {{ currentDate }}</p>
  </div>
  
  <div class="flex flex-wrap w-full gap-4 p-4">
    <div
      v-for="column in columns"
      :key="column.id"
      class="flex flex-col bg-gradient-to-r from-blue-800 to-indigo-900 rounded-md p-2 flex-1 sm:flex-none sm:w-1/3 lg:w-1/6 box"
    >
      <button @click="goToTask(column.id)" class="font-bold text-center mb-2 w-full">
        {{ column.name }}
      </button>

      <!-- Progress bar -->
      <div class="column-progress mb-2">
        <div class="w-full bg-gray-200 rounded h-2 overflow-hidden">
          <div
            class="bg-green-500 h-2"
            :style="{ width: getProgress(column) + '%' }"
          ></div>
        </div>
        <div class="text-sm text-center mt-1">{{ getProgress(column) }}%</div>
      </div>

      <!-- Draggable tasks -->
      <draggable
        v-model="column.tasks"
        group="tasks"
        class="flex flex-col gap-2 overflow-y-auto"
        item-key="id"
        @end="onDragEnd(column)"
      >
        <template #item="{ element }">
          <div 
            class="bg-white p-2 border rounded cursor-grab subbox"
            :class="{
              'border-red-500': element.priority === 'high',
              'border-yellow-500': element.priority === 'medium',
              'border-blue-500': element.priority === 'low',
              'border-gray-300': !element.priority
            }"
          >
            <input
              type="checkbox"
              :checked="!!element.done"
              @change="toggleTaskDone(element, $event.target.checked)"
            />
            <span :class="{ 'line-through text-gray-400': element.done }">
              {{ element.name }}
            </span>
            <span 
              class="text-xs ml-2"
              :class="{
                'text-red-500': element.priority === 'high',
                'text-yellow-600': element.priority === 'medium',
                'text-blue-500': element.priority === 'low'
              }"
            >
              {{ element.priority }}
            </span>
          </div>
        </template>
      </draggable>
    </div>
  </div>
  <button @click="hello">
    Hello
  </button>
</template>

<script>
import draggable from 'vuedraggable'
import store from '../store'
import axiosInstance from '../api';

export default {
  components: { draggable },
  computed: {
    columns () {
      return store.columns
    }
  },
  data () {
    return {
      newTask: '',
      currentDate: '',
      taskPriority: 'medium'
    }
  },
  mounted() {
    this.updateDate();
    setInterval(this.updateDate, 60 * 1000);
  },
  methods: {
    create () {
      const name = this.newTask.trim()
      if (!name) return
      const triColumn = store.columns.find(c => c.name.toLowerCase().includes('trier')) || store.columns[0]
      store.addTaskToColumn(triColumn.id, name, this.taskPriority)
      this.newTask = ''
    },
    updateDate() {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      this.currentDate = new Date().toLocaleDateString("en-EN", options);
    },
    getProgress (column) {
      const total = column.tasks?.length || 0
      if (total === 0) return 0
      const done = column.tasks.filter(t => t.done).length
      return Math.round((done / total) * 100)
    },
    async hello(){
      const res = await axiosInstance.get('/auth');
      console.log(res.data.message)
    },
  async onDragEnd(evt, column) {
    const movedTask = evt.item.__vue__.task;
    if (movedTask.status !== column.id) {
      movedTask.status = column.id;
      await axios.put(`/tasks/${movedTask.id}`, movedTask);
    }
  },
  async toggleTaskDone(task, checked) {
    task.done = !!checked;
    await axios.put(`/tasks/${task.id}`, task);
  },
    goToTask(id){
      this.$router.push({ name: 'tasks', params: { id } })
    }
  }
}
</script>

<style scoped>
* {
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}

.box {
  background-color: #083048;
  color: white;
}

.subbox {
  background-color: #0c4a6e;
  border: none;
}

button:hover {
  transform: translateY(-2px);
}

#date {
  color: #0f527b;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
}
</style>