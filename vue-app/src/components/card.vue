<template>
  <div class="card p-4 bg-white shadow-lg rounded-2xl w-80">
    <h2 class="text-xl font-semibold mb-3 text-gray-800">📝 Ma To-Do List</h2>

    <ul>
      <li v-for="(task, index) in tasks" :key="index" class="flex items-center mb-2">
        <input
          type="checkbox"
          v-model="task.done"
          class="mr-3 w-5 h-5 accent-blue-500 cursor-pointer"
        />
        <span :class="{ 'line-through text-gray-400': task.done }">
          {{ task.text }}
        </span>
      </li>
    </ul>

    <div class="mt-4 flex">
      <input
        v-model="newTask"
        placeholder="Nouvelle tâche..."
        class="flex-1 border rounded-l-lg px-3 py-1 focus:outline-none"
        @keyup.enter="addTask"
      />
      <button
        @click="addTask"
        class="bg-blue-500 text-white px-4 py-1 rounded-r-lg hover:bg-blue-600"
      >
        ➕
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  transition: transform 0.2s ease;
}
.card:hover {
  transform: scale(1.02);
}
</style>