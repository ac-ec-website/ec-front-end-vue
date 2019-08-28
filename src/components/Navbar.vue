<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <router-link to="/" class="text-white mr-3">品牌 LOGO</router-link>

    <li class="w-auto">
      <span id="navbarCartItemNumber" class="badge badge-danger" style="display: none"></span>
      <span class="text-white" style="cursor: pointer" @click.stop.prevent="toggleSideCart">購物車</span>
    </li>

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
          <!-- <li class="nav-item">
            <span class="nav-link mr-3 text-white">Option items</span>
          </li>-->

          <!-- is user is login -->
          <li class="nav-item dropdown">
            <template v-if="isLogin">
              <a
                class="btn btn-light dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >{{currentUser.name}}</a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">個人資訊</a>
                <!-- is user is admin -->
                <router-link v-if="currentUser.role === 'admin'" to="/admin/products" class="dropdown-item">管理員後台</router-link>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" @click="logout">登出</a>
              </div>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import JQuery from 'jquery'
let $ = JQuery

export default {
  computed: {
    cartItemNumber() {
      const newCount = this.$store.state.cartItemNumber
      console.log('computed cartItemNumber', newCount)

      $('#navbarCartItemNumber').html(newCount)
      if (this.$store.state.cartItemNumber > 0) {
        $('#navbarCartItemNumber').show(1000)
      } else {
        $('#navbarCartItemNumber').hide()
      }
      return this.$store.state.cartItemNumber
    },
    ...mapState(['currentUser', 'isLogin'])
  },
  watch: {
    cartItemNumber() {}
  },
  methods: {
    toggleSideCart() {
      this.$root.$emit('toggleSideCart')
    },
    logout() {
      this.$store.commit('logout')
      this.$router.push('/admin/signin')
    }
  }
}
</script>