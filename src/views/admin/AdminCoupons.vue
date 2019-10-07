<template>
  <div class="row">
    <AdminNav class="sidebar col-md-2 d-none d-md-block bg-light" />

    <div class="container col-md-9 ml-sm-auto col-lg-10 px-4">
      <router-link to="/admin/coupons/new" class="btn btn-primary btn-block mb-4">
        New Coupons
        <i class="fas fa-plus-square"></i>
      </router-link>

      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Coupon</th>
            <th scope="col">優惠碼</th>
            <th scope="col">優惠方案</th>
            <th scope="col" width="300">Action</th>
          </tr>
        </thead>

        <Spinner v-if="isLoading" />

        <tbody v-else>
          <tr v-for="coupon in coupons" :key="coupon.id">
            <th scope="row">{{ coupon.id }}</th>
            <td>{{ coupon.name }}</td>
            <td>{{ coupon.coupon_code }}</td>

            <td>
              <span v-if="coupon.type === 0" class="text-info">免運費</span>
              <span v-else-if="coupon.type === 1" class="text-info">扣款</span>
              <span v-else-if="coupon.type === 2" class="text-info">打折</span>
            </td>

            <td class="d-flex justify-content-between">
              <router-link
                :to="{name: 'admin-coupon', params: {couponId: coupon.id}}"
                class="btn btn-link"
              >
                Show
                <i class="fas fa-external-link-square-alt"></i>
              </router-link>

              <router-link
                :to="{name: 'admin-coupon-edit', params: {couponId: coupon.id}}"
                class="btn btn-link"
              >
                Edit
                <i class="fas fa-edit"></i>
              </router-link>

              <button
                type="button"
                class="btn btn-link"
                @click.stop.prevent="deleteCoupon(coupon.id)"
              >
                Delete
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import adminCouponAPI from '@/apis/admin/adminCoupon'
import AdminNav from '@/components/admin/AdminNav'
import Spinner from '@/components/Spinner'
import { Toast } from '@/utils/helpers'

export default {
  components: {
    AdminNav,
    Spinner
  },
  data() {
    return {
      coupons: [],
      isLoading: false
    }
  },
  created() {
    this.fetchCoupons()
  },
  methods: {
    async fetchCoupons() {
      const vm = this
      try {
        vm.isLoading = true
        const { data, statusText } = await adminCouponAPI.getCoupons()

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        vm.coupons = data.coupons
        vm.isLoading = false
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法取得 Coupon，請稍後再試'
        })
      }
    },
    async deleteCoupon(couponId) {
      const vm = this
      try {
        const { data, statusText } = await adminCouponAPI.deleteCoupon(couponId)

        if (statusText !== 'OK' || data.status !== 'success') {
          throw new Error(statusText)
        }

        vm.coupons = vm.coupons.filter(coupon => coupon.id !== couponId)
        Toast.fire({
          type: 'success',
          title: '刪除 Coupon 成功'
        })
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法取得刪除 Coupon，請稍後再試'
        })
      }
    }
  }
}
</script>

<style scoped>
.container {
  margin: 50px;
}

.btn-link {
  color: rgba(12, 61, 167, 0.815);
}
</style>