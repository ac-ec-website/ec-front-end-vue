<template>
  <div class="container py-5">
    <!-- 購物流程 Navbar -->
    <div class="row justify-content-center mt-3">
      <div class="col-md-7 col-12">
        <div class="row step">
          <div class="col text-center step-point-line">
            <span
              class="border bg-secondary px-4 py-2 rounded-pill text-dark mb-3 d-inline-block"
            >Step 1</span>
            <p class="text-dark h6">購物車</p>
          </div>
          <div class="col text-center step-point-line">
            <span
              class="border bg-secondary px-4 py-2 rounded-pill text-dark mb-3 d-inline-block"
            >Step 2</span>
            <p class="text-dark h6">填寫資料與付款</p>
          </div>
          <div class="col text-center">
            <span class="bg-dark px-4 py-2 rounded-pill text-light mb-3 d-inline-block">Step 3</span>
            <p class="text-dark h6">訂單確認</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 購物車有商品 -->
    <div class="row mt-3">
      <!-- 購物車清單 -->
      <div class="col-12">
        <!-- 開關合控制 -->
        <div class="card" data-toggle="collapse" href="#cartSummary" aria-expanded="true">
          <div class="card-header py-3 text-center border">
            <h4>合計: NT {{total_amount + shipping_fee | currency}}</h4>
            <h5>
              購物車&nbsp;(
              <span class="sl-cart-count ng-isolate-scope">{{cartItems.length}}</span>&nbsp;件)
              <i
                v-if="!status"
                class="fa fa-angle-down"
                aria-hidden="true"
                @click="collapseStatusChange"
              ></i>
              <i
                v-if="status"
                class="fa fa-angle-up"
                aria-hidden="true"
                @click="collapseStatusChange"
              ></i>
            </h5>
          </div>

          <div id="cartSummary" class="collapse">
            <div class="card-body border">
              <!-- Table Header -->
              <div class="row table-header">
                <div class="col-sm-4">商品資料</div>
                <div class="col-sm-1">優惠</div>
                <div class="col-sm-2 text-center">單件價格</div>
                <div class="col-sm-2 text-center">數量</div>
                <div class="col-sm-3 text-center item-total">小計</div>
              </div>

              <hr class="table-header" />
              <!-- Table Body -->
              <div
                v-for="product in cartItems"
                :key="product.id"
                class="table-row row cart-item py-1"
              >
                <!-- 商品資料欄位 -->
                <div class="col-7 col-sm-4 item-information">
                  <div class="row">
                    <div class="col-6 px-0">
                      <router-link :to="{name:'product', params:{ productId: product.id }}">
                        <img class="col-auto" :src="product.image | emptyImage" alt />
                      </router-link>
                    </div>
                    <div class="col-6 pl-0 my-auto">
                      <div>{{product.name}}</div>
                    </div>
                  </div>
                </div>
                <!-- 優惠欄位 -->
                <div class="col-1 col-sm-1 item-promotion"></div>
                <!-- 單件欄位 -->
                <div class="col-4 col-sm-2 text-center item-price my-auto">
                  <div class="row">
                    <span
                      class="col-12 col-md-12 sell_price font-weight-bold"
                    >NT {{product.sell_price | currency}}</span>
                    <span
                      class="col-12 col-md-12 original-price text-muted font-italic"
                    >NT {{product.origin_price | currency}}</span>
                  </div>
                </div>
                <!-- 數量欄位 -->
                <div class="col-6 col-md-2 text-center item-quantity my-auto">
                  <div>{{product.CartItem.quantity}}</div>
                </div>

                <!-- 小計欄位 -->
                <div class="col-6 col-md-3 text-center item-total my-auto">
                  <span
                    class="total-count"
                  >NT {{product.sell_price * product.CartItem.quantity | currency}}</span>
                </div>
              </div>
            </div>

            <!-- 訂單資訊 -->
            <div class="card-body border">
              <div class="row text-right">
                <div class="col-12 subtotal">
                  <div class="col-9 d-inline-block">小計:</div>
                  <div class="col-3 d-inline-block">NT {{total_amount | currency}}</div>
                </div>

                <div class="col-12 delivery-fee">
                  <div class="col-9 d-inline-block">運費:</div>
                  <div class="col-3 d-inline-block">NT {{shipping_fee | currency}}</div>
                </div>

                <div class="col-12 total">
                  <div class="col-9 d-inline-block">合計:</div>
                  <div
                    class="col-3 d-inline-block font-weight-bold"
                  >NT {{total_amount + shipping_fee | currency}}</div>
                </div>
              </div>
            </div>

            <div class="card-footer text-center">
              <i class="fa fa-angle-up" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.step {
  position: relative;
  z-index: 3;
}

.step .step-point-line {
  position: relative;
}

.step .step-point-line::after {
  content: "";
  display: block;
  position: absolute;
  z-index: -1;
  right: -80px;
  top: 20px;
  width: 180px;
  height: 2px;
  border-bottom: 2px solid #343a40;
}

@media (max-width: 769px) {
  .table-header {
    content: "";
    display: none;
  }
}

.fa-shopping-cart {
  font-size: 120px;
  color: #cccccc;
  display: block;
  text-align: center;
  padding: 10px 0;
}

.original-price {
  text-decoration: line-through;
}

section {
  border-radius: 0px;
  border: 1px solid #ededed;
  margin-bottom: 30px;
  padding: 0 15px;
  background-color: white;
}

.section-header {
  padding: 10px 15px;
  margin: 0 -15px;
  font-weight: 500;
  background-color: #f6f6f6;
  line-height: 26px;
}

.section-body {
  padding: 15px 0px;
}
</style>

<script>
import axios from "axios";
import { emptyImageFilter, currencyFilter } from "@/utils/mixins";
import { Toast } from "@/utils/helpers";

export default {
  mixins: [currencyFilter, emptyImageFilter],
  data() {
    return {
      cartId: 0,
      cartItems: [],
      total_amount: 0,
      shipping_fee: 0,
      status: false,
      isProcessing: false
    };
  },
  created() {
    this.fetchCart();
  },
  methods: {
    async fetchCart() {
      try {
        const vm = this;
        const id = vm.cartId;
        // const api = "https://ec-website-api.herokuapp.com/api/cart";
        const api = "http://localhost:3000/api/cart";

        const { data, statusText } = await vm.axios.get(api);

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        // 購物車內商品資訊
        this.cartItems = data.cart.items;
        this.cartItems.map(d => d.id * d.id).reduce((a, b) => a + b);
        // 購物車總價
        this.total_amount = data.total_amount;
      } catch (error) {
        if (this.cartItems.length > 1) {
          Toast.fire({
            type: "error",
            title: "無法取得購物車資料，請稍後再試"
          });
        }
      }
    },
    async postOrder(e) {
      try {
        const vm = this;
        const api = "http://localhost:3000/api/order";

        vm.isProcessing = true;

        const form = e.target;
        const formData = new FormData(form);
        const { data, statusText } = await vm.axios.post(api, formData);

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        vm.isProcessing = false;

        Toast.fire({
          type: "success",
          title: "訂單已新增，請確認"
        });

        //::TODO:: 跳轉至 Step 3 頁面
        vm.$router.push({ name: "orderDetail" });
      } catch (error) {
        if (this.cartItems.length > 1) {
          this.isProcessing = false;
          Toast.fire({
            type: "error",
            title: "無法新增訂單，請稍後再試"
          });
        }
      }
    },
    async collapseStatusChange() {
      this.status = !this.status;
    }
  }
};
</script>
