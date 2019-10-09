<template>
  <div class="row">
    <AdminNav class="sidebar col-md-2 d-none d-md-block bg-light" />

    <div class="container col-md-9 ml-sm-auto col-lg-10">
      <table class="table mt-4">
        <thead>
          <tr>
            <th scope="col">購買時間</th>
            <th scope="col">購買者</th>
            <th scope="col">購買款項</th>
            <th scope="col">應付金額</th>
            <th scope="col">是否付款</th>
            <th scope="col">出貨狀態</th>
            <th scope="col">訂單</th>
          </tr>
        </thead>

        <Spinner v-if="isLoading" />

        <tbody v-else>
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

            <td class="text-right">{{ order.checkoutPrice | currency }}</td>

            <td>
              <div v-show="!order.isEditing">
                <strong v-if="order.payment_status === '1'" class="text-success">已付款</strong>
                <span v-else class="text-muted">尚未付款</span>
              </div>

              <div v-show="order.isEditing">
                <select
                  id="payment_status"
                  v-model="order.payment_status"
                  class="form-control"
                  name="payment_status"
                  required
                >
                  <option value selected disabled>--請確認--</option>
                  <option value="0">尚未付款</option>
                  <option value="1">已付款</option>
                </select>
              </div>
            </td>

            <td>
              <div v-show="!order.isEditing">
                <strong v-if="order.shipping_status === '0'" class="text-muted">處理中</strong>
                <strong v-else-if="order.shipping_status === '1'" class="text-danger">配送中</strong>
                <strong v-else-if="order.shipping_status === '2'" class="text-success">已到貨</strong>
              </div>

              <div v-show="order.isEditing">
                <select
                  id="shipping_status"
                  v-model="order.shipping_status"
                  class="form-control"
                  name="shipping_status"
                  required
                >
                  <option value selected disabled>--請選擇--</option>
                  <option value="0">處理中</option>
                  <option value="1">配送中</option>
                  <option value="2">已到貨</option>
                </select>
              </div>
            </td>

            <td>
              <button
                v-show="!order.isEditing"
                type="button"
                class="btn btn-link"
                @click.stop.prevent="toggleIsEditing(order.id)"
              >
                狀態管理
                <i class="fas fa-file-invoice-dollar"></i>
              </button>

              <button
                v-show="order.isEditing"
                type="button"
                class="btn btn-link"
                @click.stop.prevent="updateOrder({ 
                orderId: order.id,
                payment_status: order.payment_status,
                shipping_status: order.shipping_status })"
              >
                Check
                <i class="fas fa-check"></i>
              </button>

              <router-link
                :to="{name: 'admin-order', params: {orderId: order.id}}"
                class="btn btn-link"
              >
                詳情
                <i class="fas fa-external-link-square-alt"></i>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import adminOrderAPI from '@/apis/admin/adminOrder'
import AdminNav from '@/components/admin/AdminNav'
import Spinner from '@/components/Spinner'
import { dateTimeFilter, currencyFilter } from '@/utils/mixins'
import { Toast } from '@/utils/helpers'

export default {
  components: {
    AdminNav,
    Spinner
  },
  mixins: [dateTimeFilter, currencyFilter],
  data() {
    return {
      orders: [],
      isLoading: false
    }
  },
  created() {
    this.fetchOrders()
  },
  methods: {
    async fetchOrders() {
      const vm = this
      try {
        vm.isLoading = true
        const { data, statusText } = await adminOrderAPI.getOrders()

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        vm.orders = data.orders.map(order => ({ ...order, isEditing: false }))
        vm.isLoading = false
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法取得訂單，請稍後再試'
        })
      }
    },
    async updateOrder({ orderId, payment_status, shipping_status }) {
      const vm = this
      try {
        const value = { payment_status, shipping_status }
        const { data, statusText } = await adminOrderAPI.putOrder(orderId, value)

        if (statusText !== 'OK' || data.status !== 'success') {
          throw new Error(statusText)
        }

        vm.toggleIsEditing(orderId)
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法更新出貨或金流狀態，請稍後再試'
        })
      }
    },
    toggleIsEditing(orderId) {
      const vm = this

      vm.orders = vm.orders.map(order => {
        if (order.id !== orderId) return order

        return { ...order, isEditing: !order.isEditing }
      })
    }
  }
}
</script> 

<style scoped>
.container {
  margin: 50px;
}

.btn-link {
  color: rgba(12, 61, 167, 0.815);
}
</style>