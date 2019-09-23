<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />

    <div v-else class="row">
      <div class="col-md-6">
        <h3>{{ discount.name }}</h3>
        <p>{{discount.description}}</p>

        <p v-show="discount.type === 0">優惠方案：免運費</p>
        <p v-show="discount.type === 1">優惠方案：扣款</p>
        <p v-show="discount.type === 2">優惠方案：打折</p>

        <p>消費額度：{{discount.target_price | currency}}</p>
        <p>活動開始：{{discount.start_date | dateTime}}</p>
        <p>活動結束：{{discount.end_date | dateTime}}</p>
        <hr />

        <p v-show="discount.type === 1">折抵費用：{{discount.product_reduce | currency}}</p>
        <p v-show="discount.type === 2">折抵：{{discount.percent}} %</p>

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
import Spinner from '@/components/Spinner'
import { dateTimeFilter, currencyFilter } from '@/utils/mixins'
import { Toast } from '@/utils/helpers'

export default {
  components: {
    Spinner
  },
  mixins: [dateTimeFilter, currencyFilter],
  data() {
    return {
      discount: {},
      isLoading: false
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
      const vm = this
      try {
        vm.isLoading = true
        const { data, statusText } = await adminDiscountAPI.getDiscount(discountId)

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        vm.discount = data.discount
        vm.isLoading = false
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