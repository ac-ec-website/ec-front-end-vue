<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="email">email</label>
        <input id="email" v-model="email" name="email" type="email" class="form-control" placeholder="email" required autofocus />
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input id="password" v-model="password" name="password" type="password" class="form-control" placeholder="Password" required />
      </div>

      <button :disabled="isProcessing" class="btn btn-lg btn-primary btn-block mb-3" type="submit">Submit</button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/admin/signup">Sign Up</router-link>
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
      email: '',
      password: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit(e) {
      const vm = this
      try {
        if (!this.email || !this.password) {
          Toast.fire({
            type: 'warning',
            title: '所有欄位都要填寫'
          })
          return
        }

        this.isProcessing = true
        const { data, statusText } = await vm.axios.post('http://localhost:3000/api/admin/signin', {
          email: this.email,
          password: this.password
        })
        console.log(data, statusText)

        if (data.status !== 'success') {
          Toast.fire({
            type: 'warning',
            title: data.message
          })
          this.password = ''
          this.isProcessing = false
          return
        }

        Toast.fire({
          type: 'success',
          title: '登入成功！'
        })
        vm.$router.push('/admin')
      } catch (error) {
        console.log(error, error.response.data)
        vm.isProcessing = false
        this.password = ''
      }
    }
  }
}
</script> 