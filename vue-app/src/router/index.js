import { createRouter, createWebHistory } from 'vue-router'

import Welcome from '../components/HelloWorld.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'

const routes = [
  { path: '/', name: 'welcome', component: Welcome },
  { path: '/login', name: 'Login', component: Login },
  {path : '/register', name:'register', component: Register},
  {path : '/home', name : 'home', component : Home},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router