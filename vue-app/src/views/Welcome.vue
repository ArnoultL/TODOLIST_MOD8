<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-6 space-y-6 text-center">
    <h1 class="text-4xl font-bold text-[#083048]-700">Welcome to our To-Do List Website!</h1>

    <div class="max-w-xl">
      <p class="text-gray-700 text-lg">
        In this to-do list, you can select your tasks and directly add them to your list!
      </p>
    </div>

    <div>
      <p class="text-xl font-semibold text-gray-800">Join the team!</p>
      <router-link
        to="/login"
        class="mt-4 inline-block bg-[#0c4a6e] text-white px-6 py-2 rounded"
      >
        Login
      </router-link>
    </div>

    <div class="max-w-xl text-gray-600">
      <p class="text-lg font-medium">About us:</p>
      <p class="mt-2">
        We are 4 students who want to improve the way we live. Hope this app will help you!
      </p>
      <p class="mt-1 font-semibold">Grégoire, Julie, Laetitia and Nathan</p>
    </div>
  </div>
</template>