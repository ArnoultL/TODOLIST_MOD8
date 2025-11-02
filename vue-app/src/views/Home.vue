<template>
  <section class="home-create mb-4">
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
import draggable from 'vuedraggable';
import tache from '../tache.json';

export default {
  components: {
    draggable,
  },
  computed: {
    columns(){
      return store.columns
    }
  },
  data() {
    return {
      columns: [
        { id: 1, name: 'TODO', tasks: [{ id: 1, name: 'Tâche 1' }, {id: 2, name:'Tacfsvvfvfd'}] },
        { id: 2, name: 'DOING', tasks: [{id: 1, name:'dfsfdf'}] },
        { id: 3, name: 'DONE', tasks: [] },
      ],
    };
    return {
      newTask: ''
    }
    },
  methods : {
    create () {
      const name = (this.newTask || '').trim();
      if (!name) return
      store.createTask(name)
      this.newTask = ''
    },
    getProgress (column) {
      const total = (column.tasks && column.tasks.length) || 0
      if (total === 0) return 0
      const done = column.tasks.filter(t => t.done).length
      return Math.round((done / total) * 100)
    }
    ,
    editColumn (column) {
      const name = prompt('Nouveau nom de la colonne', column.name)
      if (name !== null) store.updateColumn(column.id, { name: name.trim() || column.name })
    },
    removeColumn (column) {
      if (confirm(`Supprimer la colonne "${column.name}" ?`)) {
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

