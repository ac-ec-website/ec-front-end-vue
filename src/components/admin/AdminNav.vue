<template>
  <div class="row mb-4">
    <div class="col-sm-2">
      <div class="card">
        <div class="card-body">
          <router-link class="btn btn-link" to="/admin/products">
            產品列表
            <i class="fas fa-box-open"></i>
          </router-link>
        </div>
      </div>
    </div>

    <div class="col-sm-2">
      <div class="card">
        <div class="card-body">
          <router-link class="btn btn-link" to="/admin/categories">
            產品類別
            <i class="fas fa-align-justify"></i>
          </router-link>
        </div>
      </div>
    </div>

    <div class="col-sm-2">
      <div class="card">
        <div class="card-body">
          <router-link class="btn btn-link" to="/admin/coupons">
            優惠券
            <i class="fas fa-ticket-alt"></i>
          </router-link>
        </div>
      </div>
    </div>

    <div class="col-sm-2">
      <div class="card">
        <div class="card-body">
          <router-link class="btn btn-link" to="/admin/orders">
            訂單列表
            <i class="far fa-list-alt"></i>
          </router-link>
        </div>
      </div>
    </div>

    <div class="col-sm-2">
      <div class="card">
        <div class="card-body">
          <router-link class="btn btn-link" to="/admin/users">
            會員管理
            <i class="fas fa-users-cog"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.1);
}

.btn-link {
  color: rgb(15, 170, 136);
}
</style>