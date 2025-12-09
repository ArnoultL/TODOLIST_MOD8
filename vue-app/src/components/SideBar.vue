<template>
  <aside class="sidebar">
    <header class="sidebarbloc">
      <div class="header-top">
        <h2 class="sidebar-title">Menu</h2>
        <div class="button-group">
          <button class="nav-button" @click="toggle(); goToPage()">⇢</button>
          <button class="close-button" @click="toggle">&times;</button>
        </div>
      </div>
    </header>
    <section class="sidebar-content">
      <router-link to="/addtasks" class="text-blue-600 hover:underline">Add Tasks</router-link>
      <h2>------My Tasks------</h2>
      <ul class="sidebar-list">
        <li v-for="(item, index) in tasks" :key="index">
          <button @click="goToTasks(item.id)">{{ item.name }}, {{ item.id }}</button>
        </li>
      </ul>
    </section>
  </aside>
</template>

<script>
export default {
  props: ['toggle','tasks','goToTasks'],
  data() {
    return {
    }
  },
  methods: {
    goToPage() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
*{
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100vh;
  background-color: #e9d2b3;
  color: black;
  border-left: 1px solid #444;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.sidebarbloc {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-bottom: 1px solid #444;
  padding-bottom: 0.5rem;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button-group {
  display: flex;
  gap: 0.5rem;
}



.nav-button:hover {
  background: #1e90ff; /* bleu clair */
}

.close-button:hover {
  background: #ff4444; /* rouge clair */
}

.sidebar-title {
  font-weight: bold;
  font-size: 1.2rem;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  margin-top: 1rem;
}

.sidebar-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-list li {
  padding: 0.5rem;
  border-bottom: 1px solid #333;
  cursor: pointer;
  transition: background 0.2s;
}

.sidebar-list li:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>
