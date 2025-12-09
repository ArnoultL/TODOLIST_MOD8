import { createRouter, createWebHistory } from 'vue-router'

import Welcome from '../components/HelloWorld.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import Wel from '../views/Welcome.vue'
import Tasks from '../views/Tasks.vue'
import AddTasks from '../views/AddTasks.vue'

const routes = [
  { path: '/login', name: 'Login', component: Login, meta: { requiresAuth: false } },
  { path: '/register', name: 'register', component: Register, meta: { requiresAuth: false } },
  { path: '/', name: 'home', component: Home, meta: { requiresAuth: true } },
  { path: '/apropos', name: 'apropos', component: Wel, meta: { requiresAuth: true } },
  { path: '/addtasks', name: 'Addtasks', component: AddTasks, meta: { requiresAuth: true } },
  { path: '/tasks/:id', name: 'tasks', component: Tasks, props: true, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const isAuthenticated = !!token
  const requiresAuth = to.meta.requiresAuth

  if (requiresAuth && !isAuthenticated) {
    next('/login')
  }
  else if (isAuthenticated && (to.path === '/login' || to.path === '/register')) {
    next('/')
  }
  else {
    next()
  }
})

export default router