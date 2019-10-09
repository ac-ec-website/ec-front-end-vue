<template>
  <div class="row">
    <AdminNav class="sidebar col-md-2 d-none d-md-block bg-light" />

    <div class="container col-md-9 ml-sm-auto col-lg-10">
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
            <th scope="col">活動方案</th>
            <th scope="col" width="300">Action</th>
          </tr>
        </thead>

        <Spinner v-if="isLoading" />

        <tbody v-else>
          <tr v-for="discount in discounts" :key="discount.id">
            <th scope="row">{{ discount.id }}</th>
            <td>{{ discount.name }}</td>
            <td>{{ discount.target_price }}</td>

            <td>
              <span v-if="discount.type === 0" class="text-info">免運費</span>
              <span v-else-if="discount.type === 1" class="text-info">扣款</span>
              <span v-else-if="discount.type === 2" class="text-info">打折</span>
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
  </div>
</template>

<script>
import adminDiscountAPI from '@/apis/admin/adminDiscount'
import AdminNav from '@/components/admin/AdminNav'
import Spinner from '@/components/Spinner'
import { Toast } from '@/utils/helpers'

export default {
  components: {
    AdminNav,
    Spinner
  },
  data() {
    return {
      discounts: [],
      isLoading: false
    }
  },
  created() {
    this.fetchDiscounts()
  },
  methods: {
    async fetchDiscounts() {
      const vm = this
      try {
        vm.isLoading = true
        const { data, statusText } = await adminDiscountAPI.getDiscounts()

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        vm.discounts = data.discounts
        vm.isLoading = false
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法取得 discount，請稍後再試'
        })
      }
    },
    async deleteDiscount(discountId) {
      const vm = this
      try {
        const { data, statusText } = await adminDiscountAPI.deleteDiscount(discountId)

        if (statusText !== 'OK' || data.status !== 'success') {
          throw new Error(statusText)
        }

        vm.discounts = vm.discounts.filter(discount => discount.id !== discountId)
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
.container {
  margin: 50px;
}

.btn-link {
  color: rgba(12, 61, 167, 0.815);
}
</style>