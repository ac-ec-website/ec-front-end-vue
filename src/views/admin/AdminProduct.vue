<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />

    <div v-else class="row">
      <div class="col-md-12">
        <h2>{{ product.name }}</h2>
        <strong>[{{ product.categoryName }}]</strong>
      </div>

      <div class="col-md-4">
        <img class="img-responsive center-block" :src="product.image | emptyImage" />

        <div class="well">
          <ul class="list-unstyled">
            <li>
              <strong>成本:</strong>
              {{ product.cost_price }} 元
            </li>
            <li>
              <strong>原價:</strong>
              {{ product.origin_price }} 元
            </li>
            <li>
              <strong>特價:</strong>
              {{ product.sell_price }} 元
            </li>
            <li>
              <strong>庫存:</strong>
              {{ product.stock_quantity }}
            </li>
            <li>
              <strong v-if="product.product_status">產品已啟用</strong>
              <strong v-else>產品未啟用</strong>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-md-8">
        <p>{{ product.description }}</p>
      </div>
    </div>
    <hr />

    <a href="#" @click="$router.back()">回上一頁</a>
  </div>
</template>

<script>
import adminProductAPI from '@/apis/admin/adminProduct'
import Spinner from '@/components/Spinner'
import { emptyImageFilter } from '@/utils/mixins'
import { Toast } from '@/utils/helpers'

export default {
  components: {
    Spinner
  },
  mixins: [emptyImageFilter],
  data() {
    return {
      product: {},
      isLoading: false
    }
  },
  created() {
    const { productId } = this.$route.params
    this.fetchProduct(productId)
  },
  beforeRouteUpdate(to, from, next) {
    // 路由改變時重新抓取資料
    const { productId } = to.params
    this.fetchProduct(productId)
    next()
  },
  methods: {
    async fetchProduct(productId) {
      const vm = this
      try {
        vm.isLoading = true
        const { data, statusText } = await adminProductAPI.getProduct(productId)

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        vm.product = {
          ...data.product,
          categoryName: data.product.Category.name
        }
        vm.isLoading = false
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法取得產品資料，請稍後再試'
        })
      }
    }
  }
}
</script>

<style scoped>
.img-responsive {
  width: 250px;
  margin-bottom: 25px;
}
</style>