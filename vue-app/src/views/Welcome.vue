<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-6 space-y-6 text-center">
    <h1 class="text-4xl font-bold text-[#083048]-700">Welcome to our To-Do List Website!</h1>

    <div class="max-w-xl">
      <p class="text-gray-700 text-lg">
        In this to-do list, you can select your tasks and directly add them to your list!
      </p>
    </div>

    <div>
      <router-link
        to="/register"
        class="text-white bg-gradient-to-r from-blue-800 to-indigo-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Join us now !
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