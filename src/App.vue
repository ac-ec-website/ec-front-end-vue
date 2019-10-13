<template>
  <div id="app">
    <Navbar />

    <main role="main" class="main-content">
      <router-view />
    </main>

    <footer class="footer-content">
      <div class="state">(聲明)本作品內圖片、內容等，純粹為團隊練習前端使用，不做任何商業用途。</div>
    </footer>
  </div>
</template>

<script>
/* eslint-disable */
import Navbar from '@/components/Navbar'

let userPageView = parseInt(sessionStorage.getItem('userPageView'))

if (isNaN(userPageView)) {
  sessionStorage.setItem('userPageView', 1)
} else {
  sessionStorage.setItem('userPageView', userPageView + 1)
}

userPageView = parseInt(sessionStorage.getItem('userPageView'))
if (userPageView === 1) {
  window.location = 'https://ec-website-api.herokuapp.com/redirect-back'
}

export default {
  components: {
    Navbar
  }
}
</script>

<style lang="css" scoped>
.main-content {
  margin-top: 3em;
}

.footer-content {
  height: 50px;
  /* background-color: black; */
}

.state {
  font-size: 1.4em;
  color: rgb(12, 12, 12);
  text-align: right;
  line-height: 45px;
}
</style>
