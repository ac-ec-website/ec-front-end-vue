<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-4">
        <h5>訂單編號：{{ order.id }}</h5>
        <p>買者姓名：{{ order.name }}</p>
        <p>連絡電話：{{ order.phone }}</p>
        <p>聯絡地址：{{ order.address }}</p>
        <p>購買日期：{{ order.createdAt | dateTime }}</p>
        <p>消費總額：{{ order.total_amount | currency }}</p>
        <hr />

        <div class="mb-3">
          付款狀態：
          <strong v-if="order.payment_status === '1'" class="text-success">已付款</strong>
          <span v-else class="text-muted">尚未付款</span>
        </div>

        <div class="mb-3">
          出貨狀態：
          <strong v-show="order.shipping_status === '0'" class="text-muted">處理中</strong>
          <strong v-show="order.shipping_status === '1'" class="text-danger">配送中</strong>
          <strong v-show="order.shipping_status === '2'" class="text-success">已到貨</strong>
        </div>

        <a href="#" @click="$router.back()">回上一頁</a>
      </div>

      <div class="col-md-8">
        <div v-for="product in order.items" :key="product.id" class="card mb-3">
          <div class="row no-gutters">
            <div class="col-md-3">
              <img :src="product.image | emptyImage" class="card-img" />
            </div>

            <div class="col-md-8">
              <div class="card-body">
                <p>商品名稱：{{ product.name }}</p>
                <p>購買數量：{{ product.OrderItem.quantity }}</p>
                <span>商品總額：{{ product.OrderItem.price }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import adminOrderAPI from '@/apis/admin/adminOrder'
import { dateTimeFilter, currencyFilter, emptyImageFilter } from '@/utils/mixins'
import { Toast } from '@/utils/helpers'

export default {
  mixins: [dateTimeFilter, currencyFilter, emptyImageFilter],
  data() {
    return {
      order: {}
    }
  },
  created() {
    const { orderId } = this.$route.params
    this.fetchOrder(orderId)
  },
  beforeRouteUpdate(to, from, next) {
    const { orderId } = to.params
    this.fetchOrder(orderId)
    next()
  },
  methods: {
    async fetchOrder(orderId) {
      try {
        const vm = this
        const { data, statusText } = await adminOrderAPI.getOrder(orderId)

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        vm.order = data.order
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法取得訂單資料，請稍後再試'
        })
      }
    }
  }
}
</script>

<style scoped>
.card {
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.5);
}

.card-img {
  width: 10em;
  height: 10em;
}
</style>