import { createRouter, createWebHistory } from 'vue-router'

import Welcome from '../components/HelloWorld.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import Wel from '../views/Welcome.vue'
import Tasks from '../views/Tasks.vue'
import AddTasks from '../views/AddTasks.vue'

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path : '/register', name:'register', component: Register },
  { path: '/', name: 'Welcome', component: Welcome, meta: { auth: false } },
  { path : '/home', name : 'home', component : Home, meta: { auth: false } },
  { path : '/apropos', name : 'apropos', component : Wel, meta: { auth: false } },
  { path : '/addtasks', name: 'addtasks', component: AddTasks, meta: { auth: false } },
  { path : '/tasks/:id', name : 'tasks', component : Tasks, props: true, meta: { auth: false } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((nextRoute, to, next) => {
  const authNeeded = nextRoute.meta.auth

  if (!authNeeded) {
    // Si l'authentification pour aller sur la route n'est pas requise, alors on autorise la navigation
    next()
  }

  next('/login')
})

export default router