<template>
  <div class="container py-5">
    <form class="w-100" @submit.stop.prevent="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign Up</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="name">Name</label>
        <input id="name" v-model="name" name="name" type="text" class="form-control" placeholder="name" required autofocus />
      </div>

      <div class="form-label-group mb-2">
        <label for="email">Email</label>
        <input id="email" v-model="email" name="email" type="email" class="form-control" placeholder="email" required />
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input id="password" v-model="password" name="password" type="password" class="form-control" placeholder="Password" required />
      </div>

      <div class="form-label-group mb-3">
        <label for="password-check">Password Check</label>
        <input id="password-check" v-model="passwordCheck" name="passwordCheck" type="password" class="form-control" placeholder="Password" required />
      </div>

      <button :disabled="isProcessing" class="btn btn-lg btn-primary btn-block mb-3" type="submit">Submit</button>

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
        if (!this.name || !this.email || !this.password || !this.passwordCheck) {
          Toast.fire({
            type: 'warning',
            title: '所有欄位都要填寫'
          })
          return
        }

        if (this.password !== this.passwordCheck) {
          Toast.fire({
            type: 'warning',
            title: '兩次密碼輸入不同！'
          })
          this.password = ''
          this.passwordCheck = ''
          return
        }

        this.isProcessing = true
        const { data, statusText } = await vm.axios.post('https://ec-website-api.herokuapp.com/api/admin/signup', {
          name: this.name,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck
        })
        console.log(data, statusText)

        if (data.status !== 'success') {
          Toast.fire({
            type: 'warning',
            title: data.message
          })
          this.password = ''
          this.passwordCheck = ''
          this.isProcessing = false
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
        this.password = ''
        this.passwordCheck = ''
      }
    }
  }
}
</script> 