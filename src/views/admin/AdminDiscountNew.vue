<template>
  <div class="container py-5">
    <AdminDiscountForm :is-processing="isProcessing" @after-submit="handleAfterSubmit" />
  </div>
</template>

<script>
import AdminDiscountForm from '@/components/admin/AdminDiscountForm.vue'

import { Toast } from '@/utils/helpers'

export default {
  components: {
    AdminDiscountForm
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
        const api = 'https://ec-website-api.herokuapp.com/api/admin/discounts'
        vm.isProcessing = true
        const { data, statusText } = await vm.axios.post(api, formData)

        if (statusText !== 'OK' || data.status !== 'success') {
          throw new Error(statusText)
        }

        vm.$router.push({ name: 'admin-discounts' })
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          type: 'error',
          title: '無法新增 discount，請稍後再試'
        })
      }
    }
  }
}
</script>