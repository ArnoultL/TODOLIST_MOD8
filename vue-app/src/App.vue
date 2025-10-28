<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="text-center p-6">
    <nav class="flex justify-center gap-6 mb-6 text-lg">
      <router-link to="/" class="text-blue-600 hover:underline">Welcome</router-link>
      <router-link to="/home" class="text-blue-600 hover:underline">Home</router-link>
    </nav>
    <div class="flex justify-center items-center gap-8">
      <a href="https://vite.dev" target="_blank" class="transition-transform hover:scale-110">
        <img src="/vite.svg" class="h-16 w-16" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank" class="transition-transform hover:scale-110">
        <img src="./assets/vue.svg" class="h-16 w-16" alt="Vue logo" />
      </a>
    </div>
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
