<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />

    <AdminCouponForm
      v-else
      :initial-coupon="coupon"
      :is-processing="isProcessing"
      :edit-page="editPage"
      @after-submit="handleAfterSubmit"
    />
  </div>
</template>

<script>
import adminCouponAPI from '@/apis/admin/adminCoupon'
import AdminCouponForm from '@/components/admin/AdminCouponForm.vue'
import Spinner from '@/components/Spinner'
import { Toast } from '@/utils/helpers'

export default {
  components: {
    AdminCouponForm,
    Spinner
  },
  data () {
    return {
      coupon: {},
      isProcessing: false,
      editPage: true,
      isLoading: false
    }
  },
  created () {
    const { couponId } = this.$route.params
    this.fetchCoupon(couponId)
  },
  beforeRouteUpdate (to, from, next) {
    const { couponId } = to.params
    this.fetchCoupon(couponId)
    next()
  },
  methods: {
    async fetchCoupon (couponId) {
      const vm = this
      try {
        vm.isLoading = true
        const { data, statusText } = await adminCouponAPI.getCoupon(couponId)

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        vm.coupon = {
          ...data.coupon,
          end_date: data.coupon.end_date.substring(0, 19)
        }
        vm.isLoading = false
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法取得 coupon 資料，請稍後再試'
        })
      }
    },
    async handleAfterSubmit (formData) {
      const vm = this
      try {
        vm.isProcessing = true
        const { data, statusText } = await adminCouponAPI.putCoupon(vm.coupon.id, formData)

        if (statusText !== 'OK' || data.status !== 'success') {
          throw new Error(statusText)
        }

        vm.$router.push({ name: 'admin-coupons' })
      } catch (error) {
        vm.isProcessing = false
        Toast.fire({
          type: 'error',
          title: '無法編輯 coupon，請稍後再試'
        })
      }
    }
  }
}
</script>
