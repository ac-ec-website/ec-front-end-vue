<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-6">
        <h3>{{ discount.name }}</h3>
        <p>{{discount.description}}</p>

        <p>消費額度：{{discount.target_price | currency}}</p>
        <p>折抵：{{discount.percent}} %</p>
        <p>折抵費用：{{discount.product_reduce | currency}}</p>
        <p>活動開始：{{discount.start_date | dateTime}}</p>
        <p>活動結束：{{discount.end_date | dateTime}}</p>
        <hr />

        <div class="mb-3">
          <strong v-if="discount.shipping_free === 1" class="text-success">免運費</strong>
          <span v-else class="text-muted">需運費</span>
        </div>

        <a href="#" @click="$router.back()">回上一頁</a>
      </div>
    </div>
  </div>
</template>

<script>
import adminDiscountAPI from '@/apis/admin/adminDiscount'
import { dateTimeFilter, currencyFilter } from '@/utils/mixins'
import { Toast } from '@/utils/helpers'

export default {
  mixins: [dateTimeFilter, currencyFilter],
  data() {
    return {
      discount: {}
    }
  },
  created() {
    const { discountId } = this.$route.params
    this.fetchDiscount(discountId)
  },
  beforeRouteUpdate(to, from, next) {
    const { discountId } = to.params
    this.fetchDiscount(discountId)
    next()
  },
  methods: {
    async fetchDiscount(discountId) {
      try {
        const vm = this
        const { data, statusText } = await adminDiscountAPI.getDiscount(discountId)

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        vm.discount = data.discount
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法取得 discount 資料，請稍後再試'
        })
      }
    }
  }
}
</script>