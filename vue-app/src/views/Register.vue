<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
      <h1 class="text-2xl font-semibold text-center text-gray-800 mb-6">
        Register
      </h1>

      <form class="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Username"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          id="register"
          type="submit"
          class="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>
