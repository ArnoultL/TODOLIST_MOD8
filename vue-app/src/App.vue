<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="text-center p-6">
    <h1>MyToDo App</h1>
    <nav class="flex justify-center gap-6 mb-6 text-lg">
      <router-link to="/" class="text-blue-600 hover:underline">Welcome</router-link>
      <router-link to="/login" class="text-blue-600 hover:underline">Login</router-link>
    </nav>
     <router-view />
  </div>
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
