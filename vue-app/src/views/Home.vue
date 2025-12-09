<template>
  <!-- Date actuelle -->
  <div class="max-w-7xl mx-auto px-4 mb-4">
    <p class="text-gray-600 text-center">Today is: {{ currentDate }}</p>
  </div>

  <!-- Formulaire de création rapide -->
  <section class="max-w-7xl mx-auto px-4 mb-6">
    <div class="bg-[#083048] p-4 rounded-lg shadow-lg">
      <form @submit.prevent="createNewTask" class="flex gap-3">
        <input
          v-model="newTaskName"
          placeholder="New task name..."
          class="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-white  bg-opacity-50 placeholder-gray-300"
        />

        <input
          v-model="newTaskDescription"
          placeholder="Description (optional)..."
          class="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-white  bg-opacity-50 placeholder-gray-300"
        />

        <select
          v-model="newTaskPriority"
          class="px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-white bg-transparent border border-gray-400 priority-select"
        >
          <option value="high" class="text-gray-800 bg-white">Important</option>
          <option value="medium" class="text-gray-800 bg-white">Medium</option>
          <option value="low" class="text-gray-800 bg-white">Low</option>
        </select>

        <button
          type="submit"
          class="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow whitespace-nowrap"
        >
          + Add Task
        </button>
      </form>
    </div>
  </section>

  <!-- Message de chargement -->
  <div v-if="loading" class="text-center py-8">
    <p class="text-gray-600">Loading your tasks...</p>
  </div>

  <!-- Message d'erreur -->
  <div v-if="error && !loading" class="text-center py-8">
    <p class="text-red-600">{{ error }}</p>
    <button @click="loadTasks" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
      Retry
    </button>
  </div>

  <!-- VUE KANBAN : Tâches racines = colonnes -->
  <div v-if="!loading" class="px-4 pb-8">
    <div v-if="rootTasks.length === 0" class="text-center py-12">
      <p class="text-gray-500 text-lg mb-4">No tasks yet. Create your first task!</p>
    </div>

    <!-- Colonnes Kanban -->
    <div class="grid grid-cols-4 gap-4 w-full">
      <div
        v-for="column in rootTasks"
        :key="column.id"
        class="flex flex-col bg-[#0A3F5E] rounded-md p-2 box"
      >
        <!-- En-tête de colonne -->
        <div class="flex items-center justify-between mb-2">
          <button
            @click="editColumnName(column)"
            class="font-bold !bg-transparent text-center flex-1 text-white hover:text-blue-200 transition-colors"
          >
            {{ column.name }}
          </button>
          <button
            @click="deleteColumn(column)"
            class="text-white hover:text-red-300 text-xl px-2"
            title="Delete task"
          >
            ×
          </button>
        </div>

        <!-- Barre de progression -->
        <div class="column-progress mb-2">
          <div class="w-full bg-gray-200 rounded h-2 overflow-hidden">
            <div
              class="bg-green-500 h-2 transition-all duration-300"
              :style="{ width: getColumnProgress(column) + '%' }"
            ></div>
          </div>
          <div class="text-sm text-center mt-1 text-white">{{ getColumnProgress(column) }}%</div>
        </div>

        <!-- Bouton ajouter une carte -->
        <button
          v-if="column.level < 2"
          @click="showAddCardForm(column)"
          class="w-full mb-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm transition-colors"
        >
          + Add subtask
        </button>

        <!-- Formulaire d'ajout de carte -->
        <div v-if="addingCardToColumn === column.id" class="mb-2 p-2 bg-white rounded">
          <input
            v-model="newCardName"
            @keyup.enter="addCardToColumn(column)"
            @keyup.esc="cancelAddCard"
            placeholder="Subtask name..."
            class="w-full px-2 py-1 border rounded mb-1 text-sm !text-black"
            ref="cardInput"
          />
          <div class="flex gap-1">
            <button
              @click="addCardToColumn(column)"
              class="flex-1 px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
            >
              Add
            </button>
            <button
              @click="cancelAddCard"
              class="flex-1 px-2 py-1 bg-gray-300 text-gray-700 rounded text-xs hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>

        <!-- Cartes draggables (sous-tâches) -->
        <draggable
          v-model="column.subtasks"
          group="cards"
          class="flex flex-col gap-2 overflow-y-auto min-h-[100px] flex-1"
          item-key="id"
          @end="onCardDragEnd"
          :animation="200"
        >
          <template #item="{ element }">
            <div
              class="bg-white p-2 border rounded cursor-grab subbox transition-all hover:shadow-md"
              :class="{
                'border-red-500': element.importance === 'Important',
                'border-yellow-500': element.importance === 'Medium',
                'border-green-500': element.importance === 'Low',
                'border-gray-300': !element.importance,
                'opacity-60': element.done
              }"
            >
              <div class="flex items-center gap-2">
                <input
                  type="checkbox"
                  :checked="element.done"
                  @change="toggleCardDone(element)"
                  class="cursor-pointer"
                />
                <span
                  :class="{ 'line-through text-gray-400': element.done }"
                  class="flex-1 text-left text-sm items-center flex"
                >
                  <span
                      class="text-xl mr-1"
                      :class="{
                      'text-red-500': element.priority === 'high',
                      'text-yellow-600': element.priority === 'medium',
                      'text-blue-500': element.priority === 'low'
                    }"
                  >
                    •
                  </span>
                  {{ element.name }}
                </span>
                <button
                  v-if="element.level < 2"
                  @click="openSubtaskModal(element)"
                  class="text-blue-500 hover:text-blue-700 text-xs"
                  title="Add subtask"
                >
                  +
                </button>
                <button
                  @click="deleteCard(element)"
                  class="cursor-pointer text-sm opacity-70 hover:opacity-100"
                  title="Delete"
                >
                  ×
                </button>
              </div>

              <!-- Sous-sous-tâches (level 2) -->
              <div v-if="element.subtasks && element.subtasks.length > 0" class="mt-2 pl-4 border-l-2 border-blue-200 space-y-1">
                <div
                  v-for="subtask in element.subtasks"
                  :key="subtask.id"
                  class="flex items-center gap-2 text-xs"
                >
                  <input
                    type="checkbox"
                    :checked="subtask.done"
                    @change="toggleCardDone(subtask)"
                    class="cursor-pointer"
                  />
                  <span :class="{ 'line-through text-gray-400': subtask.done }">
                    {{ subtask.name }}
                  </span>
                  <button
                    @click="deleteCard(subtask)"
                    class="text-red-400 hover:text-red-600 ml-auto"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>

  <!-- Modal pour ajouter une sous-tâche -->
  <div
    v-if="showSubtaskModal"
    class="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50"
    @click.self="closeSubtaskModal"
  >
    <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
      <h3 class="text-xl font-bold mb-4">Add Subtask to "{{ selectedCard?.name }}"</h3>
      <input
        v-model="newSubtaskName"
        @keyup.enter="addSubtask"
        placeholder="Subtask name..."
        class="w-full px-4 py-2 border rounded mb-3 !text-black"
        ref="subtaskInput"
      />
      <div class="flex gap-2">
        <button
          @click="addSubtask"
          class="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
        <button
          @click="closeSubtaskModal"
          class="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import store from '../store'

export default {
  components: { draggable },

  data() {
    return {
      newTaskName: '',
      newTaskDescription: '',
      newTaskPriority: 'medium',
      currentDate: '',
      loading: false,
      error: null,
      addingCardToColumn: null,
      newCardName: '',
      showSubtaskModal: false,
      selectedCard: null,
      newSubtaskName: ''
    }
  },

  computed: {
    rootTasks() {
      return store.tasks || []
    }
  },

  async mounted() {
    this.updateDate()
    await this.loadTasks()
  },

  methods: {
    async loadTasks() {
      this.loading = true
      this.error = null
      try {
        await store.loadTasks()
      } catch (err) {
        this.error = 'Failed to load tasks. Please try again.'
      } finally {
        this.loading = false
      }
    },

    async createNewTask() {
      const name = this.newTaskName.trim()
      if (!name) return

      try {
        await store.createTask(
          {
            name,
            description: this.newTaskDescription.trim() || null,
            priority: this.newTaskPriority,
            importance: this.newTaskPriority === 'high' ? 'Important' :
                       this.newTaskPriority === 'low' ? 'Low' : 'Medium'
          },
          null // Toujours créer une tâche racine (colonne)
        )

        this.newTaskName = ''
        this.newTaskDescription = ''
        this.newTaskPriority = 'medium'
      } catch (error) {
        this.error = 'Failed to create task. Please try again.'
      }
    },

    showAddCardForm(column) {
      this.addingCardToColumn = column.id
      this.$nextTick(() => {
        const inputs = this.$refs.cardInput
        if (inputs && inputs.length > 0) {
          inputs[0].focus()
        }
      })
    },

    async addCardToColumn(column) {
      const name = this.newCardName.trim()
      if (!name) return

      try {
        await store.createTask(
          {
            name,
            priority: 'medium',
            importance: 'Medium'
          },
          column.id
        )

        this.newCardName = ''
        this.addingCardToColumn = null
      } catch (error) {
        this.error = 'Failed to create card.'
      }
    },

    cancelAddCard() {
      this.addingCardToColumn = null
      this.newCardName = ''
    },

    openSubtaskModal(card) {
      this.selectedCard = card
      this.showSubtaskModal = true
      this.$nextTick(() => {
        this.$refs.subtaskInput?.focus()
      })
    },

    closeSubtaskModal() {
      this.showSubtaskModal = false
      this.selectedCard = null
      this.newSubtaskName = ''
    },

    async addSubtask() {
      const name = this.newSubtaskName.trim()
      if (!name || !this.selectedCard) return

      try {
        await store.createTask(
          {
            name,
            priority: 'medium',
            importance: 'Medium'
          },
          this.selectedCard.id
        )

        this.closeSubtaskModal()
      } catch (error) {
        this.error = 'Failed to create subtask.'
      }
    },

    async toggleCardDone(card) {
      try {
        await store.updateTask(card.id, { done: !card.done })
      } catch (error) {
        this.error = 'Failed to update card.'
      }
    },

    async deleteCard(card) {
      if (!confirm(`Delete "${card.name}"${card.subtasks?.length ? ' and all its subtasks' : ''}?`)) {
        return
      }

      try {
        await store.deleteTask(card.id)
      } catch (error) {
        this.error = 'Failed to delete card.'
      }
    },

    async deleteColumn(column) {
      if (!confirm(`Delete task "${column.name}" and all its subtasks?`)) {
        return
      }

      try {
        await store.deleteTask(column.id)
      } catch (error) {
        this.error = 'Failed to delete task.'
      }
    },

    editColumnName(column) {
      const newName = prompt('New task name:', column.name)
      if (newName && newName.trim() !== column.name) {
        store.updateTask(column.id, { name: newName.trim() })
      }
    },

    async onCardDragEnd(evt) {
      const { to } = evt

      if (!to) return

      // Trouver la colonne de destination
      let toColumn = null
      for (const column of this.rootTasks) {
        const columnElement = to.closest('.box')
        if (columnElement && columnElement.querySelector('.font-bold')?.textContent.trim() === column.name) {
          toColumn = column
          break
        }
      }

      if (!toColumn) return

      // Mettre à jour toutes les positions des cartes dans la colonne
      try {
        for (let i = 0; i < toColumn.subtasks.length; i++) {
          const card = toColumn.subtasks[i]
          await store.updateTask(card.id, {
            parentTaskId: toColumn.id,
            position: i
          })
        }
      } catch (error) {
        this.error = 'Failed to update card positions.'
      }
    },

    getColumnProgress(column) {
      if (!column.subtasks || column.subtasks.length === 0) return 0
      const total = this.countAllSubtasks(column.subtasks)
      const done = this.countAllSubtasks(column.subtasks, true)
      return total > 0 ? Math.round((done / total) * 100) : 0
    },

    countAllSubtasks(subtasks, doneOnly = false) {
      let count = 0
      for (const subtask of subtasks) {
        if (!doneOnly || subtask.done) count++
        if (subtask.subtasks && subtask.subtasks.length > 0) {
          count += this.countAllSubtasks(subtask.subtasks, doneOnly)
        }
      }
      return count
    },

    updateDate() {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      this.currentDate = new Date().toLocaleDateString("en-EN", options)
    },

    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
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

.cursor-grab:active {
  cursor: grabbing;
}

/* Style pour le select de priorité */
.priority-select {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.priority-select option {
  background-color: white;
  color: #1f2937;
}
</style>
