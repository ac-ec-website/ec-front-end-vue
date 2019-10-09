<template>
  <div class="container py-5">
    <AdminProductForm :is-processing="isProcessing" @after-submit="handleAfterSubmit" />
  </div>
</template>

<script>
import adminProductAPI from '@/apis/admin/adminProduct'
import AdminProductForm from '@/components/admin/AdminProductForm.vue'
import { Toast } from '@/utils/helpers'

export default {
  components: {
    AdminProductForm
  },
  data () {
    return {
      isProcessing: false
    }
  },
  methods: {
    async handleAfterSubmit (formData) {
      try {
        const vm = this
        const { data, statusText } = await adminProductAPI.postProduct(formData)

        if (statusText !== 'OK' || data.status !== 'success') {
          throw new Error(statusText)
        }

        vm.$router.push({ name: 'admin-products' })
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          type: 'error',
          title: '無法上架產品，請稍後再試'
        })
      }
    }
  }
}
</script>
