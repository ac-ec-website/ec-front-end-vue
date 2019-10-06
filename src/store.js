import Vue from 'vue'
import Vuex from 'vuex'
import adminUserAPI from '@/apis/admin/adminUser'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      address: '',
      role: ''
    },
    isLogin: false,
    token: '',
    cartItemNumber: 0
  },
  mutations: {
    setNavbarCartItemNumber(state, number) {
      console.log('setNavbarCartItemNumber', number)
      state.cartItemNumber = number
    },
    setCurrentUser(state, currentUser) {
      console.log('setCurrentUser')
      state.currentUser = {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        address: currentUser.address,
        role: currentUser.role
      }
      state.isLogin = true
      state.token = localStorage.getItem('token')
    },
    logout(state) {
      console.log('vuex-logout')
      state.currentUser = {}
      state.isLogin = false
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data, statusText } = await adminUserAPI.getCurrentUser()

        console.log('fetchCurrentUser', data)
        if (statusText !== 'OK' || data.status !== 'success') {
          throw new Error(`statusText: ${statusText}, ${data.message}`)
        }

        commit('setCurrentUser', {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          address: data.user.address,
          role: data.user.role
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
})
