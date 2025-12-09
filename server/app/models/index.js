import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import Tasks from '../views/Tasks.vue'

const routes = [
  // 1. Redirection par défaut : Quand on arrive sur le site, on tente d'aller sur Home
  {
    path: '/',
    redirect: '/home'
  },
  
  // 2. Les pages Publiques (accessibles sans connexion)
  { 
    path: '/login', 
    name: 'Login', 
    component: Login, 
    meta: { public: true } // On met une étiquette "public"
  },
  { 
    path: '/register', 
    name: 'Register', 
    component: Register, 
    meta: { public: true } 
  },

  // 3. Les pages Privées (accessibles UNIQUEMENT avec connexion)
  { 
    path: '/home', 
    name: 'Home', 
    component: Home, 
    meta: { public: false } // Pas public = Privé
  },
  { 
    path: '/tasks/:id', 
    name: 'Tasks', 
    component: Tasks, 
    props: true,
    meta: { public: false }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// --- LE GARDIEN (Navigation Guard) ---
router.beforeEach((to, from, next) => {
  // 1. Est-ce que la page où on veut aller est publique ?
  const isPublic = to.meta.public === true;
  
  // 2. Est-ce que l'utilisateur est connecté ? (A-t-il un token ?)
  const isAuthenticated = localStorage.getItem('token');

  // CAS A : La page est PRIVÉE et l'utilisateur n'est PAS connecté
  if (!isPublic && !isAuthenticated) {
    // ⛔ Hop, on le renvoie sur le login
    return next('/login');
  }

  // CAS B : L'utilisateur est déjà connecté et essaie d'aller sur Login ou Register
  // (Optionnel : c'est plus sympa de le renvoyer direct sur Home)
  if (isPublic && isAuthenticated) {
    return next('/home');
  }

  // CAS C : Tout est bon, on laisse passer
  next();
})

export default router