import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL = 'https://ec-website-api.herokuapp.com/api'

const axiosInstance = axios.create({
  baseURL
})

axiosInstance.defaults.withCredentials = true

axiosInstance.interceptors.request.use(
  config => {
    // 從 localStorage 將 token 取出
    const token = localStorage.getItem('token')

    // 如果 token 存在的話，則帶入到 headers 當中
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  err => Promise.reject(err)
)

export const apiHelper = axiosInstance

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})