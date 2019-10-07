<template>
  <div class="dashboard">
    <div class="admin">
      <h5>管理員</h5>

      <div class>
        <router-link class="btn btn-link" to="/admin/products">
          <i class="fas fa-box-open"></i>
          產品列表
        </router-link>
      </div>

      <div class>
        <router-link class="btn btn-link" to="/admin/categories">
          <i class="fas fa-align-justify"></i>
          產品類別
        </router-link>
      </div>

      <div class>
        <router-link class="btn btn-link" to="/admin/coupons">
          <i class="fas fa-ticket-alt"></i>
          優惠券
        </router-link>
      </div>

      <div class>
        <router-link class="btn btn-link" to="/admin/discounts">
          <i class="fas fa-tags"></i>
          特價活動
        </router-link>
      </div>

      <div class>
        <router-link class="btn btn-link" to="/admin/orders">
          <i class="far fa-list-alt"></i>
          訂單列表
        </router-link>
      </div>

      <div class>
        <router-link class="btn btn-link" to="/admin/users">
          <i class="fas fa-users-cog"></i>
          會員管理
        </router-link>
      </div>
    </div>

    <hr />
    <div class="data">
      <h5>數據分析</h5>

      <!-- 我把可能會用到的 icon 都先放上去，看情況使用 -->
      <div class>
        <router-link class="btn btn-link" to="#">
          <i class="fas fa-chart-pie"></i>
          圓餅圖
        </router-link>
      </div>

      <div class>
        <router-link class="btn btn-link" to="#">
          <i class="fas fa-chart-line"></i>
          折線圖
        </router-link>
      </div>

      <div class>
        <router-link class="btn btn-link" to="#">
          <i class="fas fa-chart-bar"></i>
          長條圖
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard h5 {
  margin-left: 10px;
  color: turquoise;
}

/* .card {
  box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.1);
} */

.btn-link {
  color: rgb(243, 131, 40);
}
</style>