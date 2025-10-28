<template>
    <div class="grid grid-cols-4 gap-4">
      <div class="bg-blue-200 p-4">
        <h2 class="font-bold mb-2">Colonne 1</h2>
      </div>
  
      <div class="bg-green-200 p-4">Colonne 2</div>
  
      <div class="bg-red-200 p-4">Colonne 3</div>
  
      <div class="bg-yellow-200 p-4">Colonne 4</div>
    </div>
  </template>

<script>
import draggable from "vuedraggable";
export default {
  name: 'HelloWorld',
  components: {
    draggable,
  },
  data() {
    return {
      articles: {
        newPitch: ["Introduction to Tailwind CSS", "GrapQL and Vue: Consume API", "Frontend:React vs Vue"],
        contentInProgress: ["Vuex vs Pinia", "Svelte vs React"],
        draftReceived: ["Getting started with Next.JS", "What is vite.js"],
        inReview: [],
      },
    };
  },
}
</script>