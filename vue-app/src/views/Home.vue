<template>
  <section class="home-create flex items-center mb-4">
    <form class="home-controls" @submit.prevent="create">
      <label for="home-new-task" class="sr-only">Nouvelle tâche</label>
      <input id="home-new-task" v-model="newTask" placeholder="Nouvelle tâche..." class="flex-1 px-3 py-2 rounded" />
      <button type="submit" class="create-btn">➕ Ajouter</button>
    </form>
  </section>

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
      // Recherche robuste de la colonne "A TRIER" (ou première colonne si pas trouvée)
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
    }
  }
}
</script>
<style scoped>
.kanban { display:flex; gap:1rem; overflow-x:auto; padding:0.5rem 0; }
.kanban-column { min-width:260px; flex:0 0 260px; background:var(--card); border-radius:0.5rem; padding:0.75rem; }
.kanban-title { text-align:center; font-weight:700; margin-bottom:0.5rem; }
.kanban-list { display:flex; flex-direction:column; gap:0.5rem; max-height:60vh; overflow:auto; }
.kanban-card { background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); padding:0.6rem; border-radius:0.4rem; cursor:grab; }
@media (max-width:640px) { .kanban-column { min-width:220px; } }

.kanban-card-inner { display:flex; align-items:center; gap:0.6rem; }
.task-checkbox { width:18px; height:18px; accent-color: var(--accent); }
.kanban-card span.done { text-decoration: line-through; opacity:0.6; }
</style>