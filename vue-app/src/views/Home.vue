<template>
  <section class="home-create flex items-center mb-4">
    <form class="home-controls" @submit.prevent="create">
      <label for="home-new-task" class="sr-only">New Task</label>
      <input id="home-new-task" v-model="newTask" placeholder="New Task..." class="flex-1 px-3 py-2 rounded" />
      <button type="submit" class="create-btn">➕ Add</button>
    </form>
  </section>

  <div class="flex flex-wrap w-full gap-4 p-4">
    <div
      v-for="column in columns"
      :key="column.id"
      class="flex flex-col bg-gray-100 rounded-md p-2 flex-1 sm:flex-none sm:w-1/3 lg:w-1/6 box"
    >
      <h3 class="font-bold text-center mb-2" >{{ column.name }}</h3>
      <div class="column-progress mb-2">
        <div class="w-full bg-gray-200 rounded h-2 overflow-hidden">
          <div
            class="bg-green-500 h-2"
            :style="{ width: getProgress(column) + '%' }"
          ></div>
        </div>
        <div class="text-sm text-center mt-1">{{ getProgress(column) }}%</div>
      </div>
      <draggable
        v-model="column.tasks"
        group="tasks"
        class="flex flex-col gap-2 overflow-y-auto"
      >
        <template #item="{ element }">
          <div class="bg-white p-2 border border-gray-300 rounded cursor-grab subbox">
            <input
              type="checkbox"
              :checked="!!element.done"
              @change="toggleTaskDone(element, $event.target.checked)"
            />
            <span :class="{ 'line-through text-gray-400': element.done }">{{ element.name }}</span>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import tache from '../tache.json';
import store from '../store'

export default {
  components: { draggable },
  computed: {
    columns () {
      return store.columns
    }
  },
  data () {
    return {
      newTask: ''
    }
  },
  methods: {
    create () {
      const name = (this.newTask || '').trim()
      if (!name) return
      const triColumn = store.columns.find(c => c.name && c.name.toLowerCase().includes('trier')) || store.columns[0]
      store.addTaskToColumn(triColumn.id, name)
      this.newTask = ''
    },

    getProgress (column) {
      const total = (column.tasks && column.tasks.length) || 0
      if (total === 0) return 0
      const done = column.tasks.filter(t => t.done).length
      return Math.round((done / total) * 100)
    },

    editColumn (column) {
      const name = prompt('Nouveau nom de la colonne', column.name)
      if (name !== null) store.updateColumn(column.id, { name: name.trim() || column.name })
    },

    removeColumn (column) {
      if (confirm(`Supprimer la colonne \"${column.name}\" ?`)) {
        store.removeColumn(column.id)
      }
    },

    addColumn () {
      const name = prompt('Nom de la nouvelle colonne', 'Nouvelle colonne')
      if (name !== null) store.addColumn(name.trim() || 'Nouvelle colonne')
    },
    toggleTaskDone (task, checked) {
      task.done = !!checked
    }
  }
}
</script>

<style scoped>
.box{
  background-color: #083048;
  color : white;
}

.subbox{
  background-color: #0c4a6e;
  border: none;
}
</style>