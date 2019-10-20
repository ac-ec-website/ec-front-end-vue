<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />

    <AdminProductForm
      v-else
      :initial-product="product"
      :is-processing="isProcessing"
      :edit-page="editPage"
      @after-submit="handleAfterSubmit"
    />
  </div>
</template>

<script>
import adminProductAPI from '@/apis/admin/adminProduct'
import AdminProductForm from '@/components/admin/AdminProductForm.vue'
import Spinner from '@/components/Spinner'
import { Toast } from '@/utils/helpers'

export default {
  components: {
    AdminProductForm,
    Spinner
  },
  data () {
    return {
      product: {},
      isProcessing: false,
      editPage: true,
      isLoading: false
    }
  },
  created () {
    const { productId } = this.$route.params
    this.fetchProduct(productId)
  },
  beforeRouteUpdate (to, from, next) {
    // 路由改變時重新抓取資料
    const { productId } = to.params
    this.fetchProduct(productId)
    next()
  },
  methods: {
    async fetchProduct (productId) {
      const vm = this
      try {
        vm.isLoading = true
        const { data, statusText } = await adminProductAPI.getProduct(productId)

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        vm.product = data.product
        vm.isLoading = false
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法取得產品資料，請稍後再試'
        })
      }
    },
    async handleAfterSubmit (formData) {
      const vm = this
      try {
        vm.isProcessing = true
        const { data, statusText } = await adminProductAPI.putProduct(vm.product.id, formData)

        if (statusText !== 'OK' || data.status !== 'success') {
          throw new Error(statusText)
        }

        vm.$router.push({ name: 'admin-products' })
      } catch (error) {
        vm.isProcessing = false
        Toast.fire({
          type: 'error',
          title: '無法編輯產品，請稍後再試'
        })
      }
    }
  }
}
</script>
