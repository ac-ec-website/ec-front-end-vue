<template>
  <div id="app">
    <Navbar />

    <main role="main" class="mt-5 bg-white">
      <router-view />
    </main>

    <footer class="bg-dark text-light py-3">
      <div class="text-right pr-5">
        <div>(聲明)本作品內圖片、內容等，純粹為團隊練習前端使用，不做任何商業用途。</div>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  components: {
    Navbar
  }
}
</script>