import axios from 'axios';
import router from './router';

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001",
  withCredentials: true,
  headers: {}
})

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem('token')

      if (router.currentRoute.value.path !== '/login' && router.currentRoute.value.path !== '/register') {
        router.push('/login')
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance;