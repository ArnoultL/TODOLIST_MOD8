<template>
  <div class="flex justify-center items-center h-screen">
    <div class="p-6 rounded shadow w-96 bg-white">
      <h2 class="text-xl font-bold mb-4">Sign In</h2>
      <form @submit.prevent="login">
        <input v-model="username" placeholder="Username" class="border p-2 w-full mb-3"/>
        <input v-model="password" type="password" placeholder="Password" class="border p-2 w-full mb-3"/>
        <button class="btn-primary text-white">Login</button>
      </form>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
      <div>
            <p>Do not have an account yet ?</p>
            <router-link to="/register" class="text-blue-600 hover:underline">Register</router-link>
        </div>
    </div>
  </div>
</template>

<script>
import axios from '../api.js';

export default {
  data() {
    return { username: '', password: '', error: '' }
  },
  methods: {
    async login() {
      try {
        const res = await axios.post('/auth/login', { username: this.username, password: this.password });
        localStorage.setItem('token', res.data.token);
        this.$router.push('/tasks');
      } catch {
        this.error = "Invalid credentials";
      }
    }
  }
}
</script>

