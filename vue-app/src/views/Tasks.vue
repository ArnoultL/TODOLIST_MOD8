<template>
  <div class="min-h-screen flex items-center justify-center p-8">
    <div class="bg-[#083048] xshadow-2xl rounded-2xl w-full max-w-3xl p-8">
      <div class="flex flex-col border-b pb-4 mb-6">
        <div class="flex items-center justify-between">
          <h1 class="text-4xl font-bold text-[#F1ECDC]">
            {{ task ? task.name : 'Loading...' }}
          </h1>
          <button class="nav-buttonbis text-white text-5xl hover:text-gray-300" @click="goBack">&times;</button>
        </div>
        <h3 class="text-left mt-2 text-xl font-bold text-[#F1ECDC]">
          {{ task ? task.description : 'Loading...' }}
        </h3>
      </div>

      <!-- Message de chargement -->
      <div v-if="loading" class="text-center py-12">
        <p class="text-gray-200 text-lg">Loading...</p>
      </div>

      <!-- Message d'erreur -->
      <div v-if="error" class="bg-red-100 border-l-4 border-red-500 p-4 rounded mb-6">
        <p class="text-red-800">{{ error }}</p>
      </div>

      <!-- Liste des sous-tâches -->
      <ul v-if="task && task.subtasks" class="space-y-4">
        <li
            v-for="(item, index) in task.subtasks"
            :key="index"
            class="bg-[#0A3F5E] hover:bg-[#0c4a6e] p-5 rounded-xl shadow-sm transition-all"
        >
          <div class="flex justify-between items-center mb-2">
            <input
                type="checkbox"
                class="big-checkbox"
                :checked="item.done"
                @change="toggleDone(item)"
            />
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
            </span>
            <span
                :class="item.done ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'"
                class="px-3 py-1 rounded-full text-sm font-semibold"
            >
              {{ knowifdone(item) }}
            </span>
          </div>

          <p v-if="item.description" class="text-gray-100 mb-3 pl-2 italic">
            {{ item.description }}
          </p>

          <!-- Sous-sous-tâches (level 2) -->
          <ul v-if="item.subtasks && item.subtasks.length" class="pl-6 border-l-2 border-blue-200 mt-3 space-y-2">
            <li
                v-for="(sub, subIndex) in item.subtasks"
                :key="subIndex"
                class="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm hover:bg-blue-50 transition-all"
            >
              <div>
                <input
                    type="checkbox"
                    class="font-medium text-gray-800"
                    :checked="sub.done"
                    @change="toggleDone(sub)"
                /> {{ sub.name }}
                <p v-if="sub.description" class="text-sm text-gray-600 italic">{{ sub.description }}</p>
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
      <span v-if="task?.subtasks?.length === 0" class="text-left text-white">No subtasks available.</span>

      <!-- Message si pas de sous-tâches -->
      <div v-else-if="task && (!task.subtasks || task.subtasks.length === 0)" class="text-center py-12">
        <p class="text-gray-400 text-lg">No subtasks yet.</p>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store'

export default {
  props: ['id'],

  data() {
    return {
      task: null,
      loading: false,
      error: null
    }
  },

  async mounted() {
    await this.loadTask()
  },

  methods: {
    async loadTask() {
      this.loading = true
      this.error = null

      try {
        // Charger les tâches si pas encore chargées
        if (store.tasks.length === 0) {
          await store.loadTasks()
        }

        // Trouver la tâche dans l'arbre
        this.task = store.findTaskById(Number(this.id), store.tasks)

        if (!this.task) {
          this.error = 'Task not found'
        }
      } catch (err) {
        this.error = 'Failed to load task: ' + err.message
      } finally {
        this.loading = false
      }
    },

    async toggleDone(item) {
      try {
        await store.updateTask(item.id, {done: !item.done})
      } catch (err) {
        this.error = 'Failed to update task'
      }
    },

    knowifdone(task) {
      return task.done ? 'Done' : 'Not Done'
    },

    goBack() {
      this.$router.push('/')
    }
  },

  watch: {
    id() {
      this.loadTask()
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

.nav-buttonbis {
  background: transparent;
  border: none;
  cursor: pointer;
}

.right {
  right: 0;
  margin-right: 0;
}
</style>
