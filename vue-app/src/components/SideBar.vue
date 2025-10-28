<template> 
    <aside class="sidebar"> 
    <h2 class="sidebar-title">Menu</h2> 
    <nav> 
        <ul> 
            <li v-for="(link, index) in links" :key="index"> 
                <a :href="link.url" class="sidebar-link">{{ link.label }}</a> 
            </li> 
        </ul> 
    </nav> 
    </aside> 
</template> 
<script setup> 
    import { ref } from 'vue' const links = ref([ { label: 'Accueil', url: '/' }, 
    { label: 'Profil', url: '/profil' }, 
    { label: 'Messages', url: '/messages' }, 
    { label: 'Paramètres', url: '/parametres' }, ]) 
</script> 
<style scoped>
.sidebar 
 { width: 240px; 
 height: 100vh; 
 background-color: #1e293b;
color: #f1f5f9; 
padding: 20px; 
display: flex; 
flex-direction: column; 
} 
  
  .sidebar-title { 
    font-size: 1.25rem; 
    margin-bottom: 1rem; 
    border-bottom: 1px solid #334155; 
    padding-bottom: 0.5rem; 
    } 
    
 .sidebar ul {
     list-style: none;
      padding: 0;
       margin: 0;
        }

 .sidebar-link { 
    display: block; 
    padding: 10px;
     color: #f1f5f9; 
     text-decoration: none; 
     border-radius: 8px;
     transition: background-color 0.2s ease; 
     } 
     
.sidebar-link:hover { 
    background-color: #334155; 
    } 
</style>