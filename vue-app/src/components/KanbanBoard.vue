<template>
    <div class="grid grid-cols-4 gap-4">
      <div class="bg-blue-200 p-4">Colonne 1</div>
      <div class="text-sm mt-2">
        <div class="">   
            <draggable class="draggable-list" :list="articles.draftReceived" group="articles">
            <div v-for="(article, i) in articles.draftReceived" :key="i"> 
            <div class="bg-white p-2  py-6 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
            <p> {{ article }} </p>
            <div class="text-grey-darker mt-2 ml-2 flex justify-between items-start">    
            </div>              
            </div>
            </div>
        </draggable>             
        </div>
        </div>
      <div class="bg-green-200 p-4">Colonne 2</div>
      <div class="bg-red-200 p-4">Colonne 3</div>
      <div class="bg-red-200 p-4">Colonne 4</div>
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