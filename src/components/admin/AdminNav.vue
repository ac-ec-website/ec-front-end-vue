<template>
  <div class="dashboard">
    <div class="nav nav-pills">
      <h5>管理員</h5>

      <div class="nav-item">
        <router-link class="nav-link" to="/admin/products">
          <i class="fas fa-box-open"></i>
          產品列表
        </router-link>
      </div>

      <div class="nav-item">
        <router-link class="nav-link" to="/admin/categories">
          <i class="fas fa-align-justify"></i>
          產品類別
        </router-link>
      </div>

      <div class="nav-item">
        <router-link class="nav-link" to="/admin/coupons">
          <i class="fas fa-ticket-alt"></i>
          優惠券
        </router-link>
      </div>

      <div class="nav-item">
        <router-link class="nav-link" to="/admin/discounts">
          <i class="fas fa-tags"></i>
          特價活動
        </router-link>
      </div>

      <div class="nav-item">
        <router-link class="nav-link" to="/admin/orders">
          <i class="far fa-list-alt"></i>
          訂單列表
        </router-link>
      </div>

      <div class="nav-item">
        <router-link class="nav-link" to="/admin/dashboard">
          <i class="fas fa-chart-line"></i>
          銷售報表
        </router-link>
      </div>

      <div class="nav-item">
        <router-link class="nav-link" to="/admin/users">
          <i class="fas fa-users-cog"></i>
          權限管理
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard h5 {
  margin: 10px;
  color: rgb(4, 167, 150);
}

.nav-pills .nav-link {
  width: 120px;
  margin-right: 7px;
  margin-bottom: 7px;
  padding: 5px 10px 3px;
  color: rgb(243, 131, 40);
  border: 1px solid #a1a1a1;
  transition: none;
}

.nav-pills .nav-link:focus,
.nav-pills .nav-link:hover,
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  border-width: 2px;
  border-color: #8302a3;
  background-color: transparent;
}
</style>
