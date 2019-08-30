<template>
  <div class="container py-5">
    <AdminNav />

    <router-link to="/admin/discounts/new" class="btn btn-primary btn-block mb-4">
      New Discounts
      <i class="fas fa-plus-square"></i>
    </router-link>

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Discount</th>
          <th scope="col">消費額度</th>
          <th scope="col">運費繳交</th>
          <th scope="col" width="300">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="discount in discounts" :key="discount.id">
          <th scope="row">{{ discount.id }}</th>
          <td>{{ discount.name }}</td>
          <td>{{ discount.target_price }}</td>

          <td>
            <span v-if="discount.shipping_free === 1" class="text-success">免運費</span>
            <span v-else class="text-muted">需運費</span>
          </td>

          <td class="d-flex justify-content-between">
            <router-link
              :to="{name: 'admin-discount', params: {discountId: discount.id}}"
              class="btn btn-link"
            >
              Show
              <i class="fas fa-external-link-square-alt"></i>
            </router-link>

            <router-link
              :to="{name: 'admin-discount-edit', params: {discountId: discount.id}}"
              class="btn btn-link"
            >
              Edit
              <i class="fas fa-edit"></i>
            </router-link>

            <button
              type="button"
              class="btn btn-link"
              @click.stop.prevent="deleteDiscount(discount.id)"
            >
              Delete
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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
      discounts: []
    }
  },
  created() {
    this.fetchDiscounts()
  },
  methods: {
    async fetchDiscounts() {
      try {
        const vm = this
        const api = 'https://ec-website-api.herokuapp.com/api/admin/discounts'
        const { data, statusText } = await vm.axios.get(api)

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        vm.discounts = data.discounts
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法取得 discount，請稍後再試'
        })
      }
    },
    async deleteDiscount(discountId) {
      try {
        const vm = this
        const api = `https://ec-website-api.herokuapp.com/api/admin/discounts/${discountId}`
        const { data, statusText } = await vm.axios.delete(api)

        if (statusText !== 'OK' || data.status !== 'success') {
          throw new Error(statusText)
        }

        vm.discounts = this.discounts.filter(discount => discount.id !== discountId)
        Toast.fire({
          type: 'success',
          title: '刪除 discount 成功'
        })
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法取得刪除 discount，請稍後再試'
        })
      }
    }
  }
}
</script>

<style scoped>
.btn-link {
  color: rgba(12, 61, 167, 0.815);
}
</style>