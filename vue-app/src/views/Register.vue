<template>
  <div class="flex justify-center items-center h-screen bg-gray-50">
    <div class="p-8 rounded-lg shadow-xl w-96 bg-white">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Username</label>
          <input
            v-model="username"
            placeholder="Choose a username"
            class="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Choose a password"
            class="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
            minlength="6"
          />
          <p class="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
        </div>
        <button
          type="submit"
          class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
          :disabled="loading"
        >
          {{ loading ? 'Creating account...' : 'Register' }}
        </button>
      </form>

      <div v-if="message" class="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
        {{ message }}
      </div>

      <div v-if="error" class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        {{ error }}
      </div>

      <div class="mt-6 text-center">
        <p class="text-gray-600 text-sm">Already have an account?</p>
        <router-link to="/login" class="text-green-600 hover:text-green-800 font-semibold hover:underline">
          Login here
        </router-link>
      </div>
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
      error: '',
      loading: false
    }
  },
  methods: {
    async register() {
      this.message = ''
      this.error = ''
      this.loading = true

      try {
        const res = await axiosInstance.post('/auth/register', {
          username: this.username,
          password: this.password
        });

        localStorage.setItem('token', res.data.token)
        this.message = "Registration successful! Redirecting to home...";

        setTimeout(() => {
          this.$router.push('/')
        }, 1500);
      } catch (err) {
        this.error = err.response?.data?.message || 'Registration failed. Username may already exist.';
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
