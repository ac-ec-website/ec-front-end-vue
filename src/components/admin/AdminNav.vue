<template>
  <div class="mb-3">
    <div class="row">
      <div class="col-sm-2">
        <div class="card">
          <div class="card-body">
            <router-link to="/admin/products">
              產品列表
              <i class="fas fa-box-open"></i>
            </router-link>
          </div>
        </div>
      </div>

      <div class="col-sm-2">
        <div class="card">
          <div class="card-body">
            <router-link to="/admin/orders">
              訂單列表
              <i class="far fa-list-alt"></i>
            </router-link>
          </div>
        </div>
      </div>

      <div class="col-sm-2">
        <div class="card">
          <div class="card-body">
            <router-link to="/admin/coupons">
              優惠券
              <i class="fas fa-ticket-alt"></i>
            </router-link>
          </div>
        </div>
      </div>

      <div class="col-sm-2">
        <div class="card">
          <div class="card-body">
            <router-link to="/admin/users">
              會員管理
              <i class="fas fa-users-cog"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 