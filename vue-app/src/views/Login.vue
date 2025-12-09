<template>
  <div class="flex justify-center items-center h-screen ">
    <div class="p-8 rounded-lg shadow-xl w-96 bg-white">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Sign In</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Username</label>
          <input
            v-model="username"
            placeholder="Enter your username"
            class="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
          :disabled="loading"
        >
          {{ loading ? 'Signing in...' : 'Login' }}
        </button>
      </form>

      <div v-if="error" class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        {{ error }}
      </div>

      <div class="mt-6 text-center">
        <p class="text-gray-600 text-sm">Don't have an account yet?</p>
        <router-link to="/register" class="text-blue-600 hover:text-blue-800 font-semibold hover:underline">
          Register here
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from '../api.js'

export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
      loading: false
    }
  },
  methods: {
    async login() {
      this.error = ''
      this.loading = true

      try {
        const res = await axiosInstance.post('/auth/login', {
          username: this.username,
          password: this.password
        })

        localStorage.setItem('token', res.data.token)
        this.$router.push({ name: 'home' })
      } catch (err) {
        this.error = err.response?.data?.message || 'Login failed. Please check your credentials.'
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
