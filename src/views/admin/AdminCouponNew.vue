<template>
  <div class="container py-5">
    <AdminCouponForm :is-processing="isProcessing" @after-submit="handleAfterSubmit" />
  </div>
</template>

<script>
import AdminCouponForm from '@/components/admin/AdminCouponForm.vue'

import { Toast } from '@/utils/helpers'

export default {
  components: {
    AdminCouponForm
  },
  data() {
    return {
      isProcessing: false
    }
  },
  methods: {
    async handleAfterSubmit(formData) {
      try {
        const vm = this
        const api = 'https://ec-website-api.herokuapp.com/api/admin/coupons'
        vm.isProcessing = true
        const { data, statusText } = await vm.axios.post(api, formData)

        if (statusText !== 'OK' || data.status !== 'success') {
          throw new Error(statusText)
        }

        vm.$router.push({ name: 'admin-coupons' })
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          type: 'error',
          title: '無法新增 coupon，請稍後再試'
        })
      }
    }
  }
}
</script>