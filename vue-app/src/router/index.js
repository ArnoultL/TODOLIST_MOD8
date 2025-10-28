import { createRouter, createWebHistory } from 'vue-router'

import Welcome from '../components/HelloWorld.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import Wel from '../views/Welcome.vue'

const routes = [
  { path: '/login', name: 'Login', component: Login },
  {path : '/register', name:'register', component: Register},
  {path : '/home', name : 'home', component : Home},
  {path : '/apropos', name : 'welcome', component : Wel}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router