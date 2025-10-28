<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="text-center p-6">
    <h1>MyToDo App</h1>
    <nav class="flex justify-center gap-6 mb-6 text-lg">
      <router-link to="/Home" class="text-blue-600 hover:underline">Welcome</router-link>
      <router-link to="/login" class="text-blue-600 hover:underline">Login</router-link>
    </nav>
     <router-view />
  </div>
  <footer class="w-full mx-auto  border-t border-gray-100 mt-1 max-w-screen-xl p-4 md:flex md:items-center md:justify-center">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">All Rights Reserved ©2025 .
      </span>
  </footer>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
