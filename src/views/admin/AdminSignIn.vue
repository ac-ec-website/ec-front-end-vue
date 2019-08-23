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

      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">Submit</button>

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
      password: ''
    }
  },
  methods: {
    handleSubmit(e) {
      const data = JSON.stringify({
        email: this.email,
        password: this.password
      })
      // TODO: 向後端驗證使用者登入資訊是否合法
      console.log('data', data)
    }
  }
}
</script> 