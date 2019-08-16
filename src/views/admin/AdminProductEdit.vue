<template>
  <div class="container py-5">
    <AdminProductForm
      :is-processing="isProcessing"
      :initial-product="product"
      @after-submit="handleAfterSubmit"
    />
  </div>
</template>

<script>
import AdminProductForm from '@/components/admin/AdminProductForm.vue'

import { Toast } from '@/utils/helpers'

export default {
  data() {
    return {
      product: {},
      isProcessing: false
    }
  },
  created() {
    const { productId } = this.$route.params
    this.fetchProduct(productId)
  },
  beforeRouteUpdate(to, from, next) {
    // 路由改變時重新抓取資料
    const { productId } = to.params
    this.fetchRestaurant(productId)
    next()
  },
  methods: {
    async fetchProduct(productId) {
      try {
        const vm = this
        const api = `https://ec-website-api.herokuapp.com/api/admin/products/${productId}`
        const { data, statusText } = await vm.axios.get(api)

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        vm.product = data.product
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法取得產品資料，請稍後再試'
        })
      }
    },
    async handleAfterSubmit(formData) {
      try {
        const vm = this
        const api = `https://ec-website-api.herokuapp.com/api/admin/products/${vm.product.id}`
        vm.isProcessing = true
        const { data, statusText } = await vm.axios.put(api, formData)

        if (statusText !== 'OK' || data.status !== 'success') {
          throw new Error(statusText)
        }

        vm.$router.push({ name: 'admin-products' })
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          type: 'error',
          title: '無法編輯產品，請稍後再試'
        })
      }
    }
  },
  components: {
    AdminProductForm
  }
}
</script> 