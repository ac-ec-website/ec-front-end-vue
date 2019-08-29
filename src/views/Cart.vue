<template>
  <div class="container py-5">
    <!-- 購物流程 Navbar -->
    <div class="row justify-content-center mt-3">
      <div class="col-md-7 col-12">
        <div class="row step">
          <div class="col text-center step-point-line step-point">
            <span class="bg-dark px-4 py-2 rounded-pill text-light mb-3 d-inline-block">Step 1</span>
            <p class="text-dark h6">購物車</p>
          </div>
          <div class="col text-center step-point-line">
            <span
              class="border bg-secondary px-4 py-2 rounded-pill text-dark mb-3 d-inline-block"
            >Step 2</span>
            <p class="text-dark h6">填寫資料</p>
          </div>
          <div class="col text-center">
            <span
              class="border bg-secondary px-4 py-2 rounded-pill text-dark mb-3 d-inline-block"
            >Step 3</span>
            <p class="text-dark h6">訂單確認與與付款</p>
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
        <div class="card">
          <div class="card-header">
            <h3>
              購物車&nbsp;(
              <span class="sl-cart-count ng-isolate-scope">{{cartItems.length}}</span>&nbsp;件)
            </h3>
          </div>
          <div class="card-body">
            <!-- Table Header -->
            <div class="row hidden-In-Mobile">
              <div class="col-sm-3">商品資料</div>
              <div class="col-sm-1">優惠</div>
              <div class="col-sm-2 text-center">單件價格</div>
              <div class="col-sm-3 text-center">數量</div>
              <div class="col-sm-2 text-center item-total">小計</div>
              <div class="col-sm-1"></div>
            </div>

            <hr class="hidden-In-Mobile" />
            <!-- Table Body -->
            <div
              v-for="product in cartItems"
              :key="product.id"
              class="table-row row cart-item py-1"
            >
              <!-- 商品資料欄位 -->
              <div class="col-7 col-md-3 item-information">
                <div class="row">
                  <!-- 商品圖片 -->
                  <div class="col-6 px-0">
                    <router-link :to="{name:'product', params:{ productId: product.id }}">
                      <img class="col-auto" :src="product.image | emptyImage" alt />
                    </router-link>
                  </div>
                  <!-- 商品名稱 -->
                  <div class="col-6 pl-0 my-auto">
                    <div>{{product.name}}</div>
                  </div>
                </div>
              </div>
              <!-- 優惠欄位 -->
              <div class="col-1 col-md-1 item-promotion"></div>
              <!-- 單件欄位 -->
              <div class="col-4 col-md-2 text-center item-price my-auto">
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
              <div class="col-12 col-md-3 text-center item-quantity my-auto">
                <div class="input-group">
                  <span class="input-group-btn">
                    <button
                      type="button"
                      class="btn btn-default btn-quantity-decrease"
                      @click.stop.prevent="subItemFromCart(cartId,product.CartItem.id)"
                    >
                      <i class="fa fa-minus"></i>
                    </button>
                  </span>
                  <span class="form-control text-center">{{product.CartItem.quantity}}</span>
                  <span class="input-group-btn">
                    <button
                      type="button"
                      class="btn btn-default btn-quantity-increase"
                      @click.stop.prevent="addItemToCart(cartId,product.CartItem.id)"
                    >
                      <i class="fa fa-plus"></i>
                    </button>
                  </span>
                </div>
              </div>

              <!-- 小計欄位 -->
              <div class="col-8 col-md-2 text-center item-total my-auto">
                <span
                  class="total-count"
                >NT {{product.sell_price * product.CartItem.quantity | currency}}</span>
              </div>

              <!-- 刪除按鈕 -->
              <div class="col-4 col-md-1 text-center item-action my-auto">
                <a
                  class="btn btn-link btn-remove-cart-item"
                  @click.stop.prevent="deleteItemFromCart(cartId,product.CartItem.id)"
                >
                  <i class="fa fa-times" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 配送選擇與訂單資訊 -->
      <div class="col-12 mt-5">
        <div class="row">
          <div class="col-sm-7 col-md-8">
            <div class="card">
              <div class="card-header">
                <h3>選擇配送方式</h3>
              </div>
              <div class="card-body">
                <form name="cartForm">
                  <div class="form-group">
                    <label for="cart-delivery-method">配送方式</label>
                    <span class="select-cart-form">
                      <select
                        id="cart-delivery-method"
                        class="form-control"
                        v-model="shipping_method"
                        required
                      >
                        <option disabled value>== 請選擇 ==</option>
                        <option name="cartDeliveryMethod" value="住家宅配">住家宅配</option>
                        <option name="cartDeliveryMethod" value="其他">其他</option>
                      </select>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="col-sm-5 col-md-4">
            <div class="card text-right">
              <div class="card-header">
                <h3>訂單資訊</h3>
              </div>

              <div class="card-body">
                <div class="subtotal ng-scope">
                  <span class="pull-left">小計:</span>
                  <span class="pull-right">NT {{total_amount | currency}}</span>
                </div>

                <div class="delivery-fee ng-scope">
                  <span class="pull-left">運費:</span>
                  <span class="pull-right">NT {{shipping_fee | currency}}</span>
                </div>
                <hr class="ng-scope" />
                <div class="total ng-scope">
                  <span class="pull-left">
                    合計
                    <span class="hidden-sm hidden-md hidden-lg">({{cartItems.length}} 件)</span>:
                  </span>
                  <span
                    class="pull-right font-weight-bold"
                  >NT {{total_amount + shipping_fee | currency}}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12">
            <button
              type="button"
              class="btn btn-success btn-block mt-3"
              @click.stop.prevent="putCart"
            >前往結帳</button>
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
</style>

<script>
import axios from "axios";
import { emptyImageFilter, currencyFilter } from "@/utils/mixins";
import { Toast } from "@/utils/helpers";

export default {
  mixins: [currencyFilter, emptyImageFilter],
  data() {
    return {
      cartId: null,
      cartItems: [],
      total_amount: 0,
      shipping_fee: 0,
      shipping_method: ""
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
        console.log("購物車 data", data);

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        // 購物車 Id
        this.cartId = data.cart.id;
        console.log("取得購物車 id", this.cartId);
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
    async addItemToCart(cartId, cartItemId) {
      try {
        axios.defaults.withCredentials = true;

        const vm = this;
        const id = vm.cartId;
        const api = `https://ec-website-api.herokuapp.com/api/cart/${id}/cartItem/${cartItemId}/add`;
        // const api = `http://localhost:3000/api/cart/${id}/cartItem/${cartItemId}/add`;

        const { data, statusText } = await vm.axios.post(api);

        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.fetchCart(cartId);
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "無法增加商品數量，請稍後再試"
        });
      }
    },
    async subItemFromCart(cartId, cartItemId) {
      try {
        axios.defaults.withCredentials = true;

        const vm = this;
        const id = vm.cartId;
        const api = `https://ec-website-api.herokuapp.com/api/cart/${id}/cartItem/${cartItemId}/sub`;
        // const api = `http://localhost:3000/api/cart/${id}/cartItem/${cartItemId}/sub`;

        const { data, statusText } = await vm.axios.post(api);

        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.fetchCart(cartId);
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "無法刪減商品數量，請稍後再試"
        });
      }
    },
    async deleteItemFromCart(cartId, cartItemId) {
      try {
        axios.defaults.withCredentials = true;

        const vm = this;
        const id = vm.cartId;
        const api = `https://ec-website-api.herokuapp.com/api/cart/${id}/cartItem/${cartItemId}`;
        // const api = `http://localhost:3000/api/cart/${id}/cartItem/${cartItemId}`;

        const { data, statusText } = await vm.axios.delete(api);

        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.fetchCart(cartId);
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "無法移除該商品，請稍後再試"
        });
      }
    },
    async putCart(e) {
      try {
        axios.defaults.withCredentials = true;

        const vm = this;
        const api = "https://ec-website-api.herokuapp.com/api/cart";
        // const api = "http://localhost:3000/api/cart";

        if (!vm.shipping_method) {
          Toast.fire({
            type: "warning",
            title: "請選擇配送方式"
          });
        }

        const shippingData = {
          shipping_method: vm.shipping_method
        };

        const { data, statusText } = await vm.axios.put(api, shippingData);

        console.log("更新後的配送資訊", data);

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        Toast.fire({
          type: "success",
          title: "配送資訊已更新"
        });

        vm.$router.push({ name: "orderCreate" });
      } catch (error) {
        if (!this.shipping_method) {
          Toast.fire({
            type: "warning",
            title: "請選擇配送方式"
          });
          return;
        }

        Toast.fire({
          type: "error",
          title: "無法更新配送資訊，請稍後再試"
        });
      }
    }
  }
};
</script>
