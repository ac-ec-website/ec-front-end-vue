<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <a class="navbar-brand" href="/">產品列表</a>

    <div id="navbarSupportedContent" class="navbar-collapse collapse">
      <div class="ml-auto d-flex align-items-center">
        <!-- is user is admin -->
        <router-link v-if="currentUser.isAdmin" to="/admin" class="text-white mr-3">管理員後台</router-link>
        <router-link to="/admin" class="text-white mr-3">購物車</router-link>
        <router-link to="/admin" class="text-white mr-3">訂單</router-link>

        <!-- is user is login -->
        <template v-if="isAuthenticated">
          <router-link :to="{ name: 'user', params: {id: currentUser.id}}" class="text-white mr-3">{{ currentUser.name || '使用者' }} 您好</router-link>

          <button type="button" class="btn btn-sm btn-outline-success my-2 my-sm-0">登出</button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
const dummyUser = {
  currentUser: {
    id: 1,
    name: '管理者',
    email: 'root@example.com',
    image: 'https://i.pravatar.cc/300',
    isAdmin: true
  },
  isAuthenticated: true
}

export default {
  data() {
    return {
      currentUser: {
        id: -1,
        name: '',
        email: '',
        image: '',
        isAdmin: false
      },
      isAuthenticated: false
    }
  },
  created() {
    this.fetchUser()
  },
  methods: {
    fetchUser() {
      this.currentUser = {
        ...this.currentUser,
        ...dummyUser.currentUser
      }
      this.isAuthenticated = dummyUser.isAuthenticated
    }
  }
}
</script>