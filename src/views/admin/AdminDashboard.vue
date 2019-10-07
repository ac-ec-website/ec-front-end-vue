<template>
  <div class="row">
    <AdminNav class="sidebar col-md-2 d-none d-md-block bg-light" />

    <div class="col-md-9 ml-sm-auto col-lg-10 px-4">
      <div class="container">
        <div class="row py-5 text-center">
          <div class="col-sm-3">商品數</div>
          <div class="col-sm-3">訂單數</div>
          <div class="col-sm-3">總營收</div>
          <div class="col-sm-3">總淨利</div>
        </div>
        <div class="row">【長條圖】每月營收、淨利</div>
        <div class="row">
          <div class="col-sm-6">熱賣商品</div>
          <div class="col-sm-6">優惠券使用情形</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNav from '@/components/admin/AdminNav'
export default {
  components: {
    AdminNav
  }
}
</script>