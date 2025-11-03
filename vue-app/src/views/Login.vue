<template>
    <div class="flex items-center justify-center min-h-screen">
      <div class="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 class="text-2xl font-semibold text-center text-gray-800 mb-6">
          Welcome Back !
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
              type="password"
              placeholder="Password"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <button
            @click="loged && $router.push({name : 'home'})":disabled="!loged"
            id="register"
            type="submit"
            class="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled
          >
            Log In
          </button>
        </form>
        <div>
            <p>Do not have an account yet ?</p>
            <router-link to="/register" class="text-blue-600 hover:underline">Register</router-link>
        </div>
      </div>
    </div>
  </template>
  
<script>
export default {
    data (){
        return {
            loged : true,
        }
    },
    methods : {
        logedIn(){
            this.loged = true;
        }
    },
}
</script>