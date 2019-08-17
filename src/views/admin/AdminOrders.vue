<template>
  <div class="container py-5">
    <AdminNav />

    <table class="table mt-4">
      <thead>
        <tr>
          <th scope="col">購買時間</th>
          <th scope="col">購買者</th>
          <th scope="col">購買款項</th>
          <th scope="col">應付金額</th>
          <th scope="col">是否付款</th>
          <th scope="col">訂單詳情</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <th scope="row">{{ order.createdAt | dateTime }}</th>
          <td>{{ order.name }}</td>

          <td>
            <ul class="list-unstyled">
              <li
                v-for="product in order.items"
                :key="product.id"
              >{{ product.name }} QT：{{ product.OrderItem.quantity }}</li>
            </ul>
          </td>

          <td class="text-right">{{ order.total_amount | currency }}</td>

          <td>
            <strong v-if="order.payment_status === '1'" class="text-success">已付款</strong>
            <span v-else class="text-muted">尚未付款</span>
          </td>

          <td>
            <router-link
              :to="{name: 'admin-order', params: {orderId: order.id}}"
              class="btn btn-link"
            >
              Show
              <i class="fas fa-external-link-square-alt"></i>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from '@/components/admin/AdminNav'

import { dateTimeFilter, currencyFilter } from '@/utils/mixins'
import { Toast } from '@/utils/helpers'

export default {
  components: {
    AdminNav
  },
  mixins: [dateTimeFilter, currencyFilter],
  data() {
    return {
      orders: []
    }
  },
  created() {
    this.fetchOrders()
  },
  methods: {
    async fetchOrders() {
      try {
        const vm = this
        const api = 'https://ec-website-api.herokuapp.com/api/admin/orders'
        const { data, statusText } = await vm.axios.get(api)
        console.log(data, statusText)

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        vm.orders = data.orders
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法取得訂單，請稍後再試'
        })
      }
    }
  }
}
</script> 

<style scoped>
.btn-link {
  color: rgba(13, 170, 243, 0.815);
}
</style>