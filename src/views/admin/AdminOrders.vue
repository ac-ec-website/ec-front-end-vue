<template>
  <div class="container py-5">
    <AdminNav />
  </div>
</template>

<script>
import AdminNav from '@/components/admin/AdminNav'

import { Toast } from '@/utils/helpers'

export default {
  components: {
    AdminNav
  },
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