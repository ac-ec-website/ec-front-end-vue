<template>
  <div class="container text-center">
    <h1 class="py-5">頁面跳轉中，請稍等～</h1>
    <div class="d-none">
      <h3>準備為訂單編號： {{order.id}} 付款</h3>
      <h4>總價 {{order.amount}}</h4>

      <form name="Spgateway" :action="tradeInfo.PayGateWay" method="POST">
        MerchantID:
        <input type="text" name="MerchantID" :value="tradeInfo.MerchantID" />
        <br />TradeInfo:
        <input type="text" name="TradeInfo" :value="tradeInfo.TradeInfo" />
        <br />TradeSha:
        <input type="text" name="TradeSha" :value="tradeInfo.TradeSha" />
        <br />Version:
        <input type="text" name="Version" :value="tradeInfo.Version" />
        <br />
        <button type="submit" class="btn btn-primary" id="postPayment">Payment</button>
      </form>
    </div>
  </div>
</template>

<script>
import paymentAPI from '@/apis/payment'
import { emptyImageFilter, currencyFilter } from '@/utils/mixins'
import { Toast } from '@/utils/helpers'

export default {
  data() {
    return {
      order: {},
      tradeInfo: {}
    }
  },
  created() {
    this.fetchPayment()
  },
  updated() {
    this.handlePaymentSubmit()
  },
  methods: {
    async fetchPayment() {
      try {
        const vm = this
        const { data, statusText } = await paymentAPI.getPayment()

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        vm.order = data.order
        vm.tradeInfo = data.tradeInfo
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法取得付款資料，請稍後再試'
        })
      }
    },
    handlePaymentSubmit() {
      document.getElementById('postPayment').click()
    }
  }
}
</script>