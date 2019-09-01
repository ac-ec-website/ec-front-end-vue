<template>
  <div class="container py-5">
    <form class="w-100" @submit.stop.prevent="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign Up</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="name"
          name="name"
          type="text"
          class="form-control"
          placeholder="name"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-2">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          required
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          required
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password-check">Password Check</label>
        <input
          id="password-check"
          v-model="passwordCheck"
          name="passwordCheck"
          type="password"
          class="form-control"
          placeholder="Password"
          required
        />
      </div>

      <button
        :disabled="isProcessing"
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
      >Submit</button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/admin/signin">Sign In</router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">&copy; 2019</p>
    </form>
  </div>
</template>

<script>
import adminAuthAPI from '@/apis/admin/adminAuth'
const { Toast } = require('../../utils/helpers')

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit(e) {
      const vm = this
      try {
        if (!vm.name || !vm.email || !vm.password || !vm.passwordCheck) {
          Toast.fire({
            type: 'warning',
            title: '所有欄位都要填寫'
          })
          return
        }

        if (vm.password !== vm.passwordCheck) {
          Toast.fire({
            type: 'warning',
            title: '兩次密碼輸入不同！'
          })
          vm.password = ''
          vm.passwordCheck = ''
          return
        }

        vm.isProcessing = true
        const { data, statusText } = await adminAuthAPI.signUp({
          name: vm.name,
          email: vm.email,
          password: vm.password,
          passwordCheck: vm.passwordCheck
        })

        if (data.status !== 'success') {
          Toast.fire({
            type: 'warning',
            title: data.message
          })
          vm.password = ''
          vm.passwordCheck = ''
          vm.isProcessing = false
          return
        }

        Toast.fire({
          type: 'success',
          title: '註冊成功！申請管理員審核中'
        })
        vm.$router.push('/admin/signin')
      } catch (error) {
        console.log(error, error.response.data)
        vm.isProcessing = false
        vm.password = ''
        vm.passwordCheck = ''
      }
    }
  }
}
</script> 