<template>
  <div class="task-item" :style="{ paddingLeft: (level * 24) + 'px' }">
    <div
      class="task-content bg-white p-4 mb-2 rounded-lg shadow-sm hover:shadow-md transition-all border-l-4"
      :class="{
        'border-red-500': task.importance === 'Important',
        'border-yellow-500': task.importance === 'Medium',
        'border-green-500': task.importance === 'Low',
        'opacity-60': task.done
      }"
    >
      <div class="flex items-center gap-3">
        <!-- Checkbox pour marquer comme fait -->
        <input
          type="checkbox"
          :checked="task.done"
          @change="toggleDone"
          class="w-5 h-5 cursor-pointer"
        />

        <!-- Bouton d'expansion si la tâche a des sous-tâches -->
        <button
          v-if="task.subtasks && task.subtasks.length > 0"
          @click="toggleExpanded"
          class="text-gray-600 hover:text-gray-900 font-bold text-lg w-6"
        >
          {{ isExpanded ? '▼' : '▶' }}
        </button>
        <div v-else class="w-6"></div>

        <!-- Nom de la tâche (cliquable pour naviguer) -->
        <div class="flex-1 flex items-center gap-3">
          <span
            :class="{ 'line-through text-gray-400': task.done }"
            class="font-medium text-gray-800 cursor-pointer hover:text-blue-600"
            @click="navigateToTask"
          >
            {{ task.name }}
          </span>

          <!-- Badge de niveau -->
          <span class="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
            {{ getLevelLabel() }}
          </span>

          <!-- Badge d'importance -->
          <span
            :class="{
              'bg-red-100 text-red-600': task.importance === 'Important',
              'bg-yellow-100 text-yellow-700': task.importance === 'Medium',
              'bg-green-100 text-green-700': task.importance === 'Low'
            }"
            class="px-2 py-1 rounded text-xs font-semibold"
          >
            {{ task.importance }}
          </span>

          <!-- Compteur de sous-tâches -->
          <span
            v-if="task.subtasks && task.subtasks.length > 0"
            class="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded"
          >
            {{ getSubtaskStats() }}
          </span>
        </div>

        <!-- Actions -->
        <div class="flex gap-2">
          <!-- Ajouter une sous-tâche (si pas au niveau max) -->
          <button
            v-if="task.level < 2"
            @click="showAddSubtask = !showAddSubtask"
            class="text-blue-500 hover:text-blue-700 text-sm px-2 py-1 rounded hover:bg-blue-50"
            title="Add subtask"
          >
            ➕
          </button>

          <!-- Supprimer -->
          <button
            @click="deleteTask"
            class="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50"
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>

      <!-- Description -->
      <p v-if="task.description" class="text-gray-600 text-sm mt-2 ml-11 italic">
        {{ task.description }}
      </p>

      <!-- Formulaire d'ajout de sous-tâche -->
      <div v-if="showAddSubtask" class="mt-3 ml-11 p-3 bg-gray-50 rounded">
        <form @submit.prevent="addSubtask" class="flex gap-2">
          <input
            v-model="newSubtaskName"
            type="text"
            placeholder="Subtask name..."
            class="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 !text-black"
            ref="subtaskInput"
          />
          <select v-model="newSubtaskPriority" class="px-3 py-2 border rounded">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">Important</option>
          </select>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
          <button
            type="button"
            @click="showAddSubtask = false"
            class="px-3 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>

    <!-- Sous-tâches récursives -->
    <div v-if="isExpanded && task.subtasks && task.subtasks.length > 0" class="subtasks">
      <TaskItem
        v-for="subtask in task.subtasks"
        :key="subtask.id"
        :task="subtask"
        :level="level + 1"
      />
    </div>
  </div>
</template>

<script>
import store from '../store'

export default {
  name: 'TaskItem',
  props: {
    task: {
      type: Object,
      required: true
    },
    level: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isExpanded: true,
      showAddSubtask: false,
      newSubtaskName: '',
      newSubtaskPriority: 'medium'
    }
  },
  methods: {
    toggleExpanded() {
      this.isExpanded = !this.isExpanded
    },

    async toggleDone() {
      await store.updateTask(this.task.id, { done: !this.task.done })
    },

    navigateToTask() {
      store.navigateToParent(this.task.id)
    },

    async deleteTask() {
      if (confirm(`Delete "${this.task.name}" and all its subtasks?`)) {
        await store.deleteTask(this.task.id)
      }
    },

    async addSubtask() {
      const name = this.newSubtaskName.trim()
      if (!name) return

      try {
        await store.createTask(
          {
            name,
            priority: this.newSubtaskPriority,
            importance: this.newSubtaskPriority === 'high' ? 'Important' :
                       this.newSubtaskPriority === 'low' ? 'Low' : 'Medium'
          },
          this.task.id
        )

        this.newSubtaskName = ''
        this.newSubtaskPriority = 'medium'
        this.showAddSubtask = false
        this.isExpanded = true
      } catch (error) {
        alert('Failed to create subtask: ' + error.message)
      }
    },

    getLevelLabel() {
      const labels = ['Main Task', 'Subtask', 'Sub-subtask']
      return labels[this.task.level] || `Level ${this.task.level}`
    },

    getSubtaskStats() {
      const total = this.task.subtasks?.length || 0
      const done = this.task.subtasks?.filter(st => st.done).length || 0
      return `${done}/${total}`
    }
  },
  watch: {
    showAddSubtask(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$refs.subtaskInput?.focus()
        })
      }
    }
  }
}
</script>

<style scoped>
.task-item {
  position: relative;
}

.task-content {
  position: relative;
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.subtasks {
  position: relative;
}

/* Lignes de connexion visuelles */
.task-item::before {
  content: '';
  position: absolute;
  left: 12px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #e5e7eb 0%, transparent 100%);
}

.task-item:last-child::before {
  bottom: 50%;
}
</style>

