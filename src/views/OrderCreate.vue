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
          <div class="col text-center step-point-line step-point">
            <span class="bg-dark px-4 py-2 rounded-pill text-light mb-3 d-inline-block">Step 2</span>
            <p class="text-dark h6">填寫資料與付款</p>
          </div>
          <div class="col text-center">
            <span
              class="border bg-secondary px-4 py-2 rounded-pill text-dark mb-3 d-inline-block"
            >Step 3</span>
            <p class="text-dark h6">訂單確認</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 購物車為空 -->
    <div v-if="cartItems.length < 1" class="row mt-5">
      <div class="col-md-6 col-12 mx-auto">
        <i class="fa fa-shopping-cart fa-5" aria-hidden="true"></i>
        <div class="mt-3 text-center">
          <h5>你的購物車是空的</h5>
          <p>記得加入商品到你的購物車</p>
          <router-link to="/products" class="btn btn-success btn-large">繼續購物</router-link>
        </div>
      </div>
    </div>

    <!-- 購物車有商品 -->
    <div v-else class="row mt-3">
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
              <div class="row hidden-In-Mobile">
                <div class="col-sm-4">商品資料</div>
                <div class="col-sm-1">優惠</div>
                <div class="col-sm-2 text-center">單件價格</div>
                <div class="col-sm-2 text-center">數量</div>
                <div class="col-sm-3 text-center item-total">小計</div>
              </div>

              <hr class="hidden-In-Mobile" />
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

    <!-- 表單區 -->
    <form class="row mt-3" @submit.stop.prevent="postOrder">
      <!-- 左側 -->
      <div class="col-sm-6">
        <!-- 1. 客戶資料 -->
        <section class="customer-form">
          <div class="row section-header">
            <span class="col-12 px-0">顧客資料</span>
          </div>
          <div class="section-body">
            <div name="customerForm">
              <div class="form-group">
                <label for="order-customer-name" class="control-label">顧客名稱</label>
                <input
                  id="order-customer-name"
                  type="text"
                  class="form-control"
                  name="orderCustomerName"
                />
              </div>
              <div class="form-group">
                <label for="order-customer-email" class="control-label">電子信箱</label>
                <input
                  id="order-customer-email"
                  type="email"
                  class="form-control"
                  name="orderCustomerEmail"
                />
              </div>
              <div class="form-group">
                <label for="order-customer-phone" class="control-label">電話號碼</label>
                <input
                  id="order-customer-phone"
                  type="tel"
                  class="form-control"
                  name="orderCustomerPhone"
                />
              </div>
              <div class="form-group">
                <label for="order-customer-address" class="control-label">地址</label>
                <input
                  id="order-customer-address"
                  type="address"
                  class="form-control"
                  name="orderCustomerAddress"
                />
              </div>
            </div>
          </div>
        </section>
        <!-- 2. 訂單備註 -->
        <!-- ::TODO:: -->
      </div>
      <!-- 右側 -->
      <div class="col-sm-6">
        <!-- 3. 送貨資料 -->
        <section class="delivery-form">
          <div class="row section-header">
            <span class="col-6 px-0">送貨資料</span>
            <span class="col-6 px-0 text-right">運費: NT {{shipping_fee}}</span>
          </div>
          <div class="section-body">
            <p>已選擇的送貨方式: {{shipping_method}}</p>
            <form
              checkout-delivery-form
              name="deliveryForm"
              class="ng-pristine ng-isolate-scope ng-valid-date ng-invalid ng-invalid-"
              style
            >
              <div id="delivery-form-content">
                <!-- ::TODO:: 暫不啟用，等 User 建置完成 -->
                <!-- <div class="form-group">
                  <label class="control-label">
                    <input type="checkbox" name="order[delivery_data][recipient_is_customer]" /> 收件人資料與顧客資料相同
                  </label>
                </div>-->
                <div class="form-group">
                  <label for="recipient-name" class="control-label">收件人名稱</label>
                  <input
                    id="recipient-name"
                    type="text"
                    class="form-control"
                    name="orderRecipientName"
                    value
                  />
                  <span>請填入收件人真實姓名，以確保順利收件</span>
                </div>
                <div class="form-group">
                  <label for="recipient-phone" class="control-label">收件人電話號碼</label>
                  <input
                    id="recipient-phone"
                    type="tel"
                    class="form-control"
                    name="orderRecipientPhone"
                  />
                </div>

                <hr />
                <div class="form-group">
                  <label for="recipient-address" class="control-label">收件人地址</label>
                  <input
                    id="recipient-phone"
                    type="address"
                    class="form-control"
                    name="orderRecipientAddress"
                  />
                </div>
              </div>
            </form>
          </div>
        </section>
        <!-- 3. 付款資料 -->
        <section class="payment-form">
          <div class="row section-header">
            <span class="col-12 px-0">付款資料</span>
          </div>
          <div class="row section-body">
            <div name="paymentForm" class="col-12">
              <div class="form-group">已選擇的付款方式: {{payment_method}}</div>
            </div>
            <div
              class="col-12 font-weight-bold"
            >合計:&nbsp;&nbsp;NT {{total_amount + shipping_fee | currency}}</div>
          </div>
        </section>
      </div>

      <!-- 表單送出 -->
      <div class="col-12">
        <div class="card mt-3">
          <div class="card-body">
            <div class="row py-2">
              <!-- 左側 -->
              <div class="col-4 col-md-6">
                <a href="#" class="btn btn-link" @click="$router.back()"><返回購物車</a>
              </div>
              <!-- 右側 -->
              <div class="col-8 col-md-6">
                <button
                  type="submit"
                  class="btn btn-success btn-block text-white"
                  :disabled="isProcessing"
                >{{ isProcessing ? "處理中..." : "買單去" }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
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

.step .step-point {
  position: relative;
}

.step .step-point::before {
  content: "";
  display: block;
  position: absolute;
  z-index: 0;
  right: 50px;
  top: 16px;
  width: 10px;
  height: 10px;
  background-color: #343a40;
  border-radius: 500px;
  animation-name: point;
  animation-duration: 2s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
}

@media (max-width: 769px) {
  .step-point {
    position: relative;
  }

  .step-point::before {
    content: "";
    display: none;
  }

  .hidden-In-Mobile {
    content: "";
    display: none;
  }
}

@keyframes point {
  0% {
    transform: translateX(0rem);
    opacity: 0;
  }
  1% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(9rem);
    opacity: 1;
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
  font-size: 18px;
  background-color: #f6f6f6;
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
      shipping_method: "住家宅配",
      payment_method: "信用卡線上支付",
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
        axios.defaults.withCredentials = true;
        const vm = this;
        const id = vm.cartId;
        const api = "https://ec-website-api.herokuapp.com/api/cart";
        // const api = "http://localhost:3000/api/cart";

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
        axios.defaults.withCredentials = true;

        const vm = this;
        const api = "https://ec-website-api.herokuapp.com/api/order";
        // const api = "http://localhost:3000/api/order";

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
