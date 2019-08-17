<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-12">
        <h1>{{ product.name }}</h1>
      </div>

      <div class="col-md-4">
        <img
          class="img-responsive center-block"
          :src="product.image | emptyImage"
          style="width: 250px;margin-bottom: 25px;"
        />
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
          </ul>
        </div>
      </div>

      <div class="col-md-8">
        <p>{{ product.description }}</p>
        <hr />
        <p v-if="product.product_status">產品已啟用</p>
        <p v-else>產品未啟用</p>
      </div>
    </div>
    <hr />

    <a href="#" @click="$router.back()">回上一頁</a>
  </div>
</template>

<script>
import { emptyImageFilter } from '@/utils/mixins'
import { Toast } from '@/utils/helpers'

export default {
  mixins: [emptyImageFilter],
  data() {
    return {
      product: {}
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
    }
  }
}
</script> 