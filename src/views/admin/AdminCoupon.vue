<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />

    <div v-else class="row">
      <div class="col-md-6">
        <h3>{{ coupon.name }}</h3>
        <p>{{coupon.description}}</p>

        <p v-show="coupon.type === 0">優惠方案：免運費</p>
        <p v-show="coupon.type === 1">優惠方案：扣款</p>
        <p v-show="coupon.type === 2">優惠方案：打折</p>

        <p>優惠碼：{{coupon.coupon_code}}</p>
        <p>使用次數：{{coupon.limited_num}}</p>
        <p>結束日期：{{coupon.end_date | dateTime}}</p>
        <hr />

        <p v-show="coupon.type === 1">折抵費用：{{coupon.product_reduce | currency}}</p>
        <p v-show="coupon.type === 2">折抵：{{coupon.percent}} %</p>

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
      coupon: {},
      isLoading: false
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
      const vm = this
      try {
        vm.isLoading = true
        const { data, statusText } = await adminCouponAPI.getCoupon(couponId)

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        vm.coupon = data.coupon
        vm.isLoading = false
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