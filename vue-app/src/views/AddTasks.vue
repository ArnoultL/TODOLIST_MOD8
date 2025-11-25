<!--
<template>
  <div class="min-h-screen bg-cream flex flex-col md:flex-row items-start justify-center py-10 px-6">
    
    <aside class="w-full md:w-1/4 mb-8 md:mb-0 md:mr-8">
      <div class="bg-white shadow-md rounded-xl p-4">
        <h2 class="text-lg font-semibold text-blue-900 mb-3">Category</h2>

        <select
          v-model="task.categoryId"
          class="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none">
          <option disabled value="">Choose category...</option>
          <option
            v-for="cat in categories"
            :key="cat.id"
            :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>
    </aside>


    <main class="flex-1 flex justify-center">
      <form
        @submit.prevent="addTask"
        class="bg-white shadow-lg rounded-2xl p-8 w-full max-w-xl space-y-5"
      >
        <div class="flex items-center gap-4">
          <div class="flex-1">
            <label class="block text-gray-700 font-semibold mb-1">Task name</label>
            <input
              v-model="task.name"
              type="text"
              required
              placeholder="Task name..."
              class="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Color</label>
            <input
              v-model="task.color"
              type="color"
              class="w-12 h-10 p-1 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label class="block text-gray-700 font-semibold mb-1">Description</label>
          <textarea
            v-model="task.description"
            rows="3"
            placeholder="Task details..."
            class="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
          ></textarea>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex-1">
            <label class="block text-gray-700 font-semibold mb-1">Importance</label>
            <select
              required
              v-model="task.importance"
              class="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option disabled value="">Choose...</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-gray-700 font-semibold mb-1">Due date</label>
          <input
            v-model="task.date"
            type="date"
            class="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div class="text-center pt-2">
          <button
            type="submit"
            class="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg transition duration-300 text-sm"
          >
            Add Task
          </button>
        </div>
      </form>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const task = ref({
  name: '',
  color: '#6b7280',
  description: '',
  importance: '',
  date: '',
  categoryId: '',
})

// Store the categories loaded from JSON
const categories = ref([])

// Load JSON data dynamically
onMounted(async () => {
  try {
    const response = await fetch('../tasks.json')
    categories.value = await response.json()
  } catch (err) {
    console.error('Error loading JSON:', err)
  }
})

// Computed: currently selected category
const selectedCategory = computed(() =>
  categories.value.find((c) => c.id === task.value.categoryId)
)

// Add a new task to the selected category
function addTask() {
  if (!task.value.categoryId) {
    alert('Please select a category first.')
    return
  }

  const category = categories.value.find(c => c.id === task.value.categoryId)
  if (!category) return

  // Create new task
  const newTask = {
    id: Date.now(),
    name: task.value.name,
    done: false,
    importance: task.value.importance,
    desc: task.value.description,
    color: task.value.color,
    date: task.value.date
  }

  // Add to the category's task list
  category.tasks.push(newTask)

  alert(`Task "${task.value.name}" added to "${category.name}"!`)

  // Reset form
  task.value = {
    name: '',
    color: '#6b7280',
    description: '',
    importance: '',
    date: '',
    categoryId: '',
  }
}
</script>

<style scoped>
.bg-cream {
  background-color: #F1ECDC;
}

@media (max-width: 768px) {
  aside {
    width: 100%;
    margin-bottom: 1.5rem;
  }
}
</style>
-->

<template>
  <div class="min-h-screen bg-cream flex flex-col md:flex-row items-start justify-center py-10 px-6">
    <!-- Barre latérale gauche -->
    <aside class="w-full md:w-1/4 mb-8 md:mb-0 md:mr-8">
      <div class="bg-white shadow-md rounded-xl p-4">
        <h2 class="text-lg font-semibold text-blue-900 mb-3">Category</h2>

        <!-- Catégories principales -->
        <select
          v-model="task.category"
          class="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none">
          <option disabled value="">Choose category...</option>
          <option
            v-for="(cat, index) in categories"
            :key="index"
            :value="cat.name">
            {{ cat.name }}
          </option>
        </select>

        <!-- Sous-catégories (à partir du dictionnaire tasks) -->
        <div v-if="selectedCategory && selectedCategory.tasks" class="mt-4">
          <label class="block text-gray-700 font-semibold mb-1">Subcategory</label>
          <select
            v-model="task.subcategory"
            class="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none">
            <option disabled value="">Choose subcategory...</option>
            <option
              v-for="(sub, subKey) in selectedCategory.tasks"
              :key="subKey"
              :value="subKey">
              {{ subKey }}
            </option>
          </select>
        </div>
      </div>
    </aside>

    <!-- Formulaire principal -->
    <main class="flex-1 flex justify-center">
      <form
        class="bg-white shadow-lg rounded-2xl p-8 w-full max-w-xl space-y-5"
        @submit.prevent="submitTask"
      >
        <div class="flex items-center gap-4">
          <div class="flex-1">
            <label class="block text-gray-700 font-semibold mb-1">Name</label>
            <input
              v-model="task.name"
              type="text"
              required
              placeholder="Task name..."
              class="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Color</label>
            <input
              v-model="task.color"
              type="color"
              class="w-12 h-10 p-1 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label class="block text-gray-700 font-semibold mb-1">Description</label>
          <textarea
            v-model="task.description"
            rows="3"
            placeholder="Task details..."
            class="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
          ></textarea>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex-1">
            <label class="block text-gray-700 font-semibold mb-1">Importance</label>
            <select
              required
              v-model="task.importance"
              class="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option disabled value="">Choose...</option>
              <option value="faible">Low</option>
              <option value="moyen">Medium</option>
              <option value="élevé">High</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-gray-700 font-semibold mb-1">Date</label>
          <input
            v-model="task.date"
            type="date"
            class="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div class="text-center pt-2">
          <button
            type="submit"
            class="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg transition duration-300 text-sm"
          >
            Add Task
          </button>
        </div>
      </form>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const task = ref({
  name: '',
  color: '#6b7280',
  description: '',
  importance: '',
  date: '',
  category: '',
  subcategory: '',
})

// ✅ Nouvelle structure avec dictionnaire `tasks`
const categories = ref([
  {
    name: 'Travail',
    tasks: {
      Projets: [],
      Réunions: [],
      Appels: []
    }
  },
  {
    name: 'Personnel',
    tasks: {
      Santé: [],
      Famille: [],
      Loisirs: []
    }
  },
  {
    name: 'Maison',
    tasks: {
      Courses: [],
      Nettoyage: [],
      Réparations: []
    }
  }
])

// ✅ Trouve la catégorie sélectionnée
const selectedCategory = computed(() =>
  categories.value.find((c) => c.name === task.value.category)
)

// ✅ Exemple futur : import JSON dynamique
onMounted(async () => {
  try {
    const response = await fetch('../tache.json')
    const data = await response.json()
    categories.value = data
  } catch (err) {
    console.warn('Erreur de chargement du fichier JSON:', err)
  }
})

function submitTask() {
  console.log('Nouvelle tâche :', task.value)
  alert(
    `Tâche "${task.value.name}" ajoutée à ${task.value.category} → ${task.value.subcategory}`
  )

  // Exemple : ajout local de la tâche dans la structure (facultatif)
  const cat = categories.value.find(c => c.name === task.value.category)
  if (cat && cat.tasks[task.value.subcategory]) {
    cat.tasks[task.value.subcategory].push({
      name: task.value.name,
      color: task.value.color,
      description: task.value.description,
      importance: task.value.importance,
      date: task.value.date
    })
  }

  // Reset
  task.value = {
    name: '',
    color: '#6b7280',
    description: '',
    importance: '',
    date: '',
    category: '',
    subcategory: '',
  }
}
</script>

<style scoped>
.bg-cream {
  background-color: #F1ECDC;
}

@media (max-width: 768px) {
  aside {
    width: 100%;
    margin-bottom: 1.5rem;
  }
}
</style>
