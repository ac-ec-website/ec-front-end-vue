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

    <!-- 購物車為空 -->
    <div v-if="orderItems.length < 1" class="row mt-5">
      <div class="col-md-6 col-12 mx-auto">
        <i class="fa fa-shopping-cart fa-5" aria-hidden="true"></i>
        <div class="mt-3 text-center">
          <h5>你的購物車是空的</h5>
          <p>記得加入商品到你的購物車</p>
          <router-link to="/products" class="btn btn-success btn-large">繼續購物</router-link>
        </div>
      </div>
    </div>

    <!-- 訂單商品資訊 -->
    <div v-else class="row mt-3">
      <!-- 購物車清單 -->
      <div class="col-12">
        <!-- 開關合控制 -->
        <div class="card" data-toggle="collapse" href="#orderSummary" aria-expanded="true">
          <div class="card-header py-3 text-center border">
            <h4>合計: NT {{total_amount + shipping_fee | currency}}</h4>
            <h5>
              購物車&nbsp;(
              <span class="sl-cart-count ng-isolate-scope">{{orderItems.length}}</span>&nbsp;件)
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

          <div id="orderSummary" class="collapse">
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
                v-for="product in orderItems"
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
                  <div>{{ product.OrderItem.quantity }}</div>
                </div>

                <!-- 小計欄位 -->
                <div class="col-6 col-md-3 text-center item-total my-auto">
                  <span
                    class="total-count"
                  >NT {{product.sell_price * product.OrderItem.quantity | currency}}</span>
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

    <!-- 訂單詳情列表  -->
    <div class="row mt-3">
      <div class="col-12 mx-auto">
        <div class="card">
          <div class="card-header py-3 text-center border">
            <div class="row">
              <div class="col-3 col-md-5 my-auto text-right">
                <i class="fas fa-check" aria-hidden="true"></i>
              </div>

              <div class="col-9 col-md-7 text-left">
                <h4>謝謝您！您的訂單已經成立！</h4>
                <span>訂單號碼 {{orderId}}</span>
                <p>訂單確認電郵已經發送到您的電子郵箱</p>
                <!-- ::TODO:: 需隱藏部分信箱資訊 -->
                <b>lovepanda996331****@gmail.com</b>
              </div>
            </div>
          </div>

          <div class="card-body">
            <!-- 訂單詳情 第一層（訂單資訊、顧客資訊） -->
            <div class="row mt-3">
              <div class="col-6">
                <h4>訂單資訊</h4>
                <div class="row">
                  <span class="col-xs-5 col-sm-4">訂單日期:</span>
                  <!-- ::TODO:: 時間須轉換 -->
                  <span class="col-xs-7 col-sm-8 datetime">{{ order.createdAt }}</span>
                </div>
                <div class="row">
                  <span class="col-xs-5 col-sm-4">訂單狀態:</span>
                  <!-- ::TODO:: 新增 orderStatus -->
                  <span class="col-xs-7 col-sm-8">出貨中</span>
                </div>

                <!-- Order fields -->
                <!-- backwards compatibility -->
              </div>
              <div class="col-6">
                <h4>顧客資訊</h4>
                <div class="row">
                  <span class="col-xs-5 col-sm-4">名稱:</span>
                  <span class="col-xs-7 col-sm-8">{{order.name}}</span>
                </div>
                <div class="row">
                  <!-- ::TODO:: 新增 orderStatus -->
                  <span class="col-xs-5 col-sm-4">電話號碼:</span>
                  <!-- ::TODO:: 需隱藏部分電話資訊 -->
                  <span class="col-xs-7 col-sm-8">{{order.phone}}</span>
                </div>
              </div>
            </div>
            <hr />
            <!-- 訂單詳情 第二層（送貨資訊、付款資訊） -->
            <div class="row mt-3">
              <div class="col-6 order-detail-section delivery-detail">
                <h4>送貨資訊</h4>
                <div class="row">
                  <span class="col-xs-5 col-sm-4">收件人名稱:</span>
                  <!-- ::TODO:: 需新增 shipping Model -->
                  <span class="col-xs-7 col-sm-8">王大明</span>
                </div>
                <div class="row">
                  <span class="col-xs-5 col-sm-4">收件人電話號碼:</span>
                  <!-- ::TODO:: 需隱藏部分電話資訊 -->
                  <span class="col-xs-7 col-sm-8">0912345678</span>
                </div>
                <div class="row">
                  <span class="col-xs-5 col-sm-4">送貨方式:</span>
                  <!-- ::TODO:: 需新增 shipping Model -->
                  <span class="col-xs-7 col-sm-8">住家宅配</span>
                </div>

                <div class="row">
                  <span class="col-xs-5 col-sm-4">送貨狀態:</span>
                  <!-- ::TODO:: 需新增 shipping Model -->
                  <span class="col-xs-7 col-sm-8">備貨中</span>
                </div>

                <div class="row">
                  <span class="col-xs-5 col-sm-4">地址:</span>
                  <!-- ::TODO:: 需新增 shipping Model -->
                  <span class="col-xs-7 col-sm-8">全家就是你家</span>
                </div>
              </div>

              <div class="col-6 order-detail-section">
                <h4>付款資訊</h4>
                <div class="row">
                  <span class="col-xs-5 col-sm-4">付款方式:</span>
                  <!-- ::TODO:: Payment_Method -->
                  <span class="col-xs-7 col-sm-8">信用卡交易</span>
                </div>
                <div class="row">
                  <span class="col-xs-5 col-sm-4">付款狀態:</span>
                  <!-- ::TODO:: Payment_Status -->
                  <span class="col-xs-7 col-sm-8">未付款</span>
                </div>

                <div class="row">
                  <span class="col-xs-5 col-sm-4">付款方式簡介:</span>
                  <!-- ::TODO:: Payment_Desrciption -->
                  <span class="col-xs-7 col-sm-8 newlines">信用卡交易</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-3 justify-content-end">
          <div class="col-12 col-md-6">
            <router-link to="/products" class="w-100 btn btn-success">繼續購物</router-link>
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

.fa-check {
  color: green;
  text-align: center;
  font-size: 38px;
  border: 5px solid green;
  line-height: 50px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
}
</style>

<script>
import axios from "axios";
import {
  emptyImageFilter,
  currencyFilter,
  dateTimeFilter
} from "@/utils/mixins";
import { Toast } from "@/utils/helpers";

export default {
  mixins: [currencyFilter, emptyImageFilter],
  data() {
    return {
      cartId: 0,
      orderId: 0,
      order: {},
      orderItems: [],
      total_amount: 0,
      shipping_fee: 0,
      status: false,
      isProcessing: false
    };
  },
  created() {
    this.fetchOrder();
  },
  methods: {
    async fetchOrder() {
      try {
        axios.defaults.withCredentials = true;

        const vm = this;
        const api = "https://ec-website-api.herokuapp.com/api/cart";
        // const api = "http://localhost:3000/api/order";
        const { data, statusText } = await vm.axios.get(api);
        console.log("訂單資料 orderdata", data);

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        // 訂單資訊
        this.order = data.order;
        // 訂單編號
        this.orderId = data.order.id;
        // 訂單商品資訊
        this.orderItems = data.order.items;
        this.orderItems.map(d => d.id * d.id).reduce((a, b) => a + b);
        // 訂單總價
        this.total_amount = data.order.total_amount;
      } catch (error) {
        if (this.orderItems.length > 1) {
          Toast.fire({
            type: "error",
            title: "無法取得訂單資料，請稍後再試"
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
