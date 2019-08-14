<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <router-link to="/" class="text-white mr-3">品牌 LOGO</router-link>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div id="navbarSupportedContent" class="navbar-collapse collapse">
      <div class="ml-auto d-flex align-items-center">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/cart" class="mr-3 nav-link">購物車</router-link>
          </li>

          <!-- is user is login -->
          <li class="nav-item dropdown">
            <template v-if="isAuthenticated">
              <a
                class="btn btn-light dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >我的帳號</a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">個人資訊</a>
                <!-- is user is admin -->
                <router-link
                  v-if="currentUser.isAdmin"
                  to="/admin/products"
                  class="dropdown-item"
                >管理員後台</router-link>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">登出</a>
              </div>
            </template>
          </li>
        </ul>
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