<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-6">
        <h3>{{ coupon.name }}</h3>
        <p>{{coupon.description}}</p>

        <p>優惠碼：{{coupon.coupon_code}}</p>
        <p>折抵：{{coupon.percent}} %</p>
        <p>折抵費用：{{coupon.product_reduce | currency}}</p>
        <p>使用次數：{{coupon.limited_num}}</p>
        <p>結束日期：{{coupon.end_date | dateTime}}</p>
        <hr />

        <div class="mb-3">
          <strong v-if="coupon.shipping_free === 1" class="text-success">免運費</strong>
          <span v-else class="text-muted">需運費</span>
        </div>

        <a href="#" @click="$router.back()">回上一頁</a>
      </div>
    </div>
  </div>
</template>

<script>
import adminCouponAPI from '@/apis/admin/adminCoupon'
import { dateTimeFilter, currencyFilter } from '@/utils/mixins'
import { Toast } from '@/utils/helpers'

export default {
  mixins: [dateTimeFilter, currencyFilter],
  data() {
    return {
      coupon: {}
    }
  },
  created() {
    const { couponId } = this.$route.params
    this.fetchCoupon(couponId)
  },
  beforeRouteUpdate(to, from, next) {
    const { couponId } = to.params
    this.fetchCoupon(couponId)
    next()
  },
  methods: {
    async fetchCoupon(couponId) {
      try {
        const vm = this
        const { data, statusText } = await adminCouponAPI.getCoupon(couponId)

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        vm.coupon = data.coupon
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法取得 coupon 資料，請稍後再試'
        })
      }
    }
  }
}
</script>