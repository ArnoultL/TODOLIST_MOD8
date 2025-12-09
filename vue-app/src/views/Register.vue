<template>
  <div class="flex justify-center items-center h-screen">
    <div class="p-6 rounded shadow w-96 bg-white">
      <h2 class="text-xl font-bold mb-4">Sign Up</h2>
      <form @submit.prevent="register">
        <input 
          v-model="username" 
          placeholder="Username" 
          class="border p-2 w-full mb-3"
        />
        <input 
          v-model="password" 
          type="password" 
          placeholder="Password" 
          class="border p-2 w-full mb-3"
        />
        <button class="btn-primary text-white">Register</button>
      </form>
      <p v-if="message" class="mt-2 text-green-600">{{ message }}</p>
      <p v-if="error" class="mt-2 text-red-600">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axiosInstance from '../api.js';

export default {
  data() {
    return {
      username: '',
      password: '',
      message: '',
      error: ''
    }
  },
  methods: {
    async hello(){
      const res = await axiosInstance.get('/auth');
      console.log(res.data.message)
    },
    async register() {
      try {
        await axiosInstance.post('/auth/register', {
          username: this.username,
          password: this.password
        });
        this.message = "Registration successful!";
        this.error = "";
        // Redirect to login after success
        setTimeout(() => this.$router.push('/login'), 1500);
      } catch (err) {
        this.error = "Registration failed. Try again.";
        this.message = "";
      }
    }
  }
}
</script>