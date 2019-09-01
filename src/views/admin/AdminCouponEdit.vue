<template>
  <div class="container py-5">
    <AdminCouponForm
      :is-processing="isProcessing"
      :initial-coupon="coupon"
      @after-submit="handleAfterSubmit"
    />
  </div>
</template>

<script>
import adminCouponAPI from '@/apis/admin/adminCoupon'
import AdminCouponForm from '@/components/admin/AdminCouponForm.vue'

import { Toast } from '@/utils/helpers'

export default {
  components: {
    AdminCouponForm
  },
  data() {
    return {
      coupon: {},
      isProcessing: false
    }
  },
  created() {
    const { couponId } = this.$route.params
    this.fetchCoupon(couponId)
  },
  beforeRouteUpdate(to, from, next) {
    const { couponId } = to.params
    this.fetchCoupon(couponId)
    next()
  },
  methods: {
    async fetchCoupon(couponId) {
      try {
        const vm = this
        const { data, statusText } = await adminCouponAPI.getCoupon(couponId)

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        vm.coupon = data.coupon
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法取得 coupon 資料，請稍後再試'
        })
      }
    },
    async handleAfterSubmit(formData) {
      try {
        const vm = this
        vm.isProcessing = true
        const { data, statusText } = await adminCouponAPI.getCoupon(vm.coupon.id, formData)

        if (statusText !== 'OK' || data.status !== 'success') {
          throw new Error(statusText)
        }

        vm.$router.push({ name: 'admin-coupons' })
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          type: 'error',
          title: '無法編輯 coupon，請稍後再試'
        })
      }
    }
  }
}
</script> 