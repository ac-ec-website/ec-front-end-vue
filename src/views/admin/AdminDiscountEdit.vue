<template>
  <div class="container py-5">
    <AdminDiscountForm
      :is-processing="isProcessing"
      :initial-discount="discount"
      @after-submit="handleAfterSubmit"
    />
  </div>
</template>

<script>
import adminDiscountAPI from '@/apis/admin/adminDiscount'
import AdminDiscountForm from '@/components/admin/AdminDiscountForm.vue'

import { Toast } from '@/utils/helpers'

export default {
  components: {
    AdminDiscountForm
  },
  data() {
    return {
      discount: {},
      isProcessing: false
    }
  },
  created() {
    const { discountId } = this.$route.params
    this.fetchdiscount(discountId)
  },
  beforeRouteUpdate(to, from, next) {
    const { discountId } = to.params
    this.fetchdiscount(discountId)
    next()
  },
  methods: {
    async fetchdiscount(discountId) {
      try {
        const vm = this

        const { data, statusText } = await adminDiscountAPI.getDiscount(discountId)

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        vm.discount = {
          ...data.discount,
          start_date: data.discount.start_date.substring(0, 19),
          end_date: data.discount.end_date.substring(0, 19)
        }
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法取得 discount 資料，請稍後再試'
        })
      }
    },
    async handleAfterSubmit(formData) {
      const vm = this
      try {
        vm.isProcessing = true
        const { data, statusText } = await adminDiscountAPI.putDiscount(vm.discount.id, formData)

        if (statusText !== 'OK' || data.status !== 'success') {
          throw new Error(statusText)
        }

        vm.$router.push({ name: 'admin-discounts' })
      } catch (error) {
        vm.isProcessing = false
        Toast.fire({
          type: 'error',
          title: '無法編輯 discount，請稍後再試'
        })
      }
    }
  }
}
</script> 