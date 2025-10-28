<template>
    <div class="grid grid-cols-4 gap-4">
      <div class="bg-blue-200 p-4">Colonne 1</div>
      <div class="bg-green-200 p-4">Colonne 2</div>
      <div class="bg-red-200 p-4">Colonne 3</div>
      <div class="bg-red-200 p-4">Colonne 4</div>
    </div>
  </template>

<script>     
import draggable from "vuedraggable";
 export default {
 name: 'HelloWorld',      components: { 
draggable,
},
} 
</script>