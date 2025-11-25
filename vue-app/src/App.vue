<template>
  <header class="flex items-center justify-between mb-6">
    <div class="flex items-center gap-4">
      <h1><router-link to="/Home" class="hover:underline">My ToDo App</router-link></h1>
    </div>
    <span>
    <nav class = "hidden sm:flex gap-4">
      <router-link to="/Home" class="text-blue-600 hover:underline">Home</router-link>
      <router-link to="/login" class="text-blue-600 hover:underline">Login</router-link>
      <router-link to="/apropos" class="text-blue-600 hover:underline">About us</router-link>
      <button class="showbar" @click="toggleSideBar">☰</button>
    </nav>
  </span>
  </header>
  <main>
    <router-view />
  </main>

    
  <footer class="w-full mx-auto  border-t border-gray-100 mt-1 max-w-screen-xl p-4 md:flex md:items-center md:justify-center">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">All Rights Reserved ©2025 .
      </span>
  </footer>
  <SideBar
  v-if="showSideBar"
  :toggle="toggleSideBar"
  :tasks="tasks"
  :goToTasks="goToTask"
  />
</template>

<style scoped>
h1{
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
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

.showbar{
  padding-top: 0;
}
</style>

<script>
import SideBar from './components/SideBar.vue';
import tache from './tache.json';

export default {
  components: {
    SideBar,
  },
  data () {
    return {
      showSideBar: false,
      tasks: tache,
      }
  },
  methods: {
    toggleSideBar (){
      this.showSideBar = !this.showSideBar
    },
    goToTask(p){
      this.$router.push({name: 'tasks', params: {id: p}})
    }
  }
}
</script>