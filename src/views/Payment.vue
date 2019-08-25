<template>
  <div>
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
      <button type="submit" class="btn btn-primary">Payment</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { emptyImageFilter, currencyFilter } from "@/utils/mixins";
import { Toast } from "@/utils/helpers";

export default {
  data() {
    return {
      order: {},
      tradeInfo: {}
    };
  },
  created() {
    this.fetchPayment();
  },
  methods: {
    async fetchPayment() {
      try {
        axios.defaults.withCredentials = true;

        const vm = this;
        const api = "https://ec-website-api.herokuapp.com/api/payment";
        // const api = "http://localhost:3000/api/payment";

        const { data, statusText } = await vm.axios.get(api);

        console.log("data", data);

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.order = data.order;
        this.tradeInfo = data.tradeInfo;
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "無法取得付款資料，請稍後再試"
        });
      }
    }
  }
};
</script>