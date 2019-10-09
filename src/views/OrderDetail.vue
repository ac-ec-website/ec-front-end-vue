<template>
  <div class="container py-5">
    <!-- 購物流程 Navbar -->
    <div class="row justify-content-center mt-3">
      <div class="col-12 col-md-8">
        <div class="row step">
          <div class="col-4 text-center step-point-line">
            <span
              class="step-by-step border bg-secondary rounded-pill text-dark d-inline-block"
            >Step 1</span>
            <p class="step-text text-dark">購物車</p>
          </div>
          <div class="col-4 text-center step-point-line">
            <span class="step-by-step bg-secondary rounded-pill text-dark d-inline-block">Step 2</span>
            <p class="step-text text-dark">填寫資料</p>
          </div>

          <div class="col-4 text-center">
            <span class="step-by-step border bg-dark rounded-pill text-light d-inline-block">Step 3</span>
            <p class="step-text text-dark">訂單確認與與付款</p>
          </div>
        </div>
      </div>
    </div>

    <Spinner v-if="isLoading" />

    <div v-else>
      <!-- 訂單商品資訊 -->
      <div class="row mt-3">
        <!-- 購物車清單 -->
        <div class="col-12">
          <!-- 開關合控制 -->
          <div class="card" data-toggle="collapse" href="#orderSummary" aria-expanded="true">
            <div class="card-header text-center py-3 border">
              <b>
                合計&nbsp;(
                <span class="sl-cart-count ng-isolate-scope">{{orderItems.length}}</span>
                &nbsp;件): NT {{checkoutPrice | currency}}
              </b>
              <span>
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
              </span>
            </div>

            <div id="orderSummary" class="collapse">
              <div class="card-body border pt-3 pb-0 hidden-In-Mobile">
                <div class="row mb-3">
                  <div class="col-md-5">商品資料</div>
                  <div class="col-md-3 text-center">單件價格</div>
                  <div class="col-md-2 text-center">數量</div>
                  <div class="col-md-2 text-center item-total">小計</div>
                </div>
              </div>

              <div class="card-body border py-0">
                <div v-for="product in orderItems" :key="product.id" class="row item-data">
                  <!-- 商品資料欄位 -->
                  <div class="col-8 col-md-5 my-auto">
                    <div class="row">
                      <div class="col-6 col-md-6">
                        <!-- 商品圖片 -->
                        <router-link :to="{name:'product', params:{ productId: product.id }}">
                          <img class="w-100" :src="product.image | emptyImage" alt />
                        </router-link>
                      </div>
                      <!-- 商品名稱 -->
                      <h6 class="col-6 col-md-6 item-name px-0">{{product.name}}</h6>
                    </div>
                  </div>

                  <!-- 單件欄位 -->
                  <div class="col-4 col-md-3 item-price my-auto text-center">
                    <div class="row">
                      <span
                        class="col-12 col-md-12 sell_price text-muted font-italic"
                      >NT {{product.sell_price | currency}}</span>
                      <span
                        class="col-12 col-md-12 original-price text-muted font-italic"
                      >NT {{product.origin_price | currency}}</span>
                    </div>
                  </div>

                  <!-- 數量欄位 -->
                  <div class="col-6 col-md-2 item-quantity text-center">
                    <span class="item-quantity-text">數量：</span>
                    <span>{{product.OrderItem.quantity}}</span>
                  </div>

                  <!-- 小計欄位 -->
                  <div class="col-6 col-md-2 item-total text-center">
                    <span
                      class="total-count"
                    >NT {{product.sell_price * product.OrderItem.quantity | currency}}</span>
                  </div>
                </div>
              </div>

              <div v-if="showCoupon" class="card-body cart-promotions pt-0">
                <div class="row mt-3">
                  <b class="col-12">已享用之優惠</b>
                  <div class="col-12 promotion-coupon">
                    <div class="row text-center p-3">
                      <span
                        class="col-4 col-md-2 coupon-name bg-success text-light my-auto py-2"
                      >{{couponData.name}}</span>
                      <span
                        class="col-4 col-md-3 my-auto py-2 coupon-description"
                      >{{couponData.description}}</span>
                      <span
                        class="col-4 col-md-7 my-auto py-2 text-right discount"
                      >- NT {{coupon_discount_fee | currency}}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 訂單資訊 -->
              <div class="card-body order-summary border">
                <div class="row text-right">
                  <div class="col-12 subtotal">
                    <div class="col-6 col-md-9 d-inline-block">小計:</div>
                    <div class="col-6 col-md-3 d-inline-block">NT {{total_amount | currency}}</div>
                  </div>

                  <div class="col-12 delivery-fee">
                    <div class="col-6 col-md-9 d-inline-block">運費:</div>
                    <div class="col-6 col-md-3 d-inline-block">NT {{shipping_fee | currency}}</div>
                  </div>

                  <div class="col-12 coupon-fee">
                    <div class="col-6 col-md-9 d-inline-block">折扣:</div>
                    <div
                      class="col-6 col-md-3 d-inline-block"
                    >- NT {{coupon_discount_fee | currency}}</div>
                  </div>

                  <div class="col-12 total">
                    <div class="col-6 col-md-9 d-inline-block">合計:</div>
                    <div
                      class="col-6 col-md-3 d-inline-block font-weight-bold"
                    >NT {{total_amount + shipping_fee - coupon_discount_fee | currency}}</div>
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

                <div class="col-9 col-md-7 text-left pl-3">
                  <h5 v-if="payment_status === '0' || payment_status === '2' ">謝謝您！您的訂單已經成立！</h5>
                  <h5 v-else-if="payment_status === '1' ">謝謝您！您的訂單完成付款囉！</h5>
                  <span>訂單號碼 {{orderId}}</span>
                  <p>訂單確認電郵已經發送到您的電子郵箱</p>
                  <h5>{{order.email}}</h5>
                </div>
              </div>
            </div>

            <div class="card-body">
              <!-- 訂單詳情 第一層（訂單資訊、顧客資訊） -->
              <div class="row mt-3">
                <div class="col-6">
                  <h5>訂單資訊</h5>
                  <div class="row">
                    <span class="col-xs-5 col-sm-4">訂單日期:</span>
                    <span class="col-xs-7 col-sm-8">{{ order.createdAt | detailedTime }}</span>
                  </div>
                  <div class="row">
                    <span class="col-xs-5 col-sm-4">訂單狀態:</span>
                    <span v-if="order_status === '1' " class="col-xs-7 col-sm-8">處理中</span>
                    <span v-else-if="order_status === '0' " class="col-xs-7 col-sm-8">已取消</span>
                  </div>
                </div>
                <div class="col-6">
                  <h5>顧客資訊</h5>
                  <div class="row">
                    <span class="col-xs-5 col-sm-4">名稱:</span>
                    <span class="col-xs-7 col-sm-8">{{order.name}}</span>
                  </div>
                  <div class="row">
                    <span class="col-xs-5 col-sm-4">電話號碼:</span>
                    <span class="col-xs-7 col-sm-8">{{order.phone}}</span>
                  </div>
                </div>
              </div>
              <hr />
              <!-- 訂單詳情 第二層（送貨資訊、付款資訊） -->
              <div class="row mt-3">
                <div class="col-12 col-md-6 order-detail-section delivery-detail">
                  <h5>送貨資訊</h5>
                  <div class="row">
                    <span class="col-6 col-md-4">收件人名稱:</span>
                    <span class="col-6 col-md-8">{{shipping.name}}</span>
                  </div>
                  <div class="row">
                    <span class="col-6 col-md-4">收件人電話號碼:</span>
                    <span class="col-6 col-md-8">{{shipping.phone}}</span>
                  </div>
                  <div class="row">
                    <span class="col-6 col-md-4">送貨方式:</span>
                    <span v-if="shipping.shipping_method === '住家宅配' " class="col-6 col-md-8">住家宅配</span>
                    <span v-else-if="shipping.shipping_method === '其他' " class="col-6 col-md-8">其他</span>
                  </div>

                  <div class="row">
                    <span class="col-6 col-md-4">送貨狀態:</span>
                    <span v-if="shipping.shipping_status === '0' " class="col-6 col-md-8">尚未配送</span>
                    <span v-else-if="shipping.shipping_status === '1' " class="col-6 col-md-8">配送中</span>
                    <span v-else-if="shipping.shipping_status === '2' " class="col-6 col-md-8">已送達</span>
                  </div>

                  <div class="row">
                    <span class="col-6 col-md-4">地址:</span>
                    <span class="col-6 col-md-8">{{shipping.address}}</span>
                  </div>
                </div>

                <div class="col-12 hidden-Except-Mobile">
                  <hr />
                </div>

                <div class="col-12 col-md-6 order-detail-section">
                  <h5>付款資訊</h5>

                  <div class="row">
                    <span class="col-6 col-md-4">付款金額:</span>
                    <span class="col-6 col-md-8">NT {{checkoutPrice | currency}}</span>
                  </div>

                  <div class="row">
                    <span class="col-6 col-md-4">付款方式:</span>
                    <span v-if="payment_status ==='0'" class="col-6 col-md-8">尚未付款</span>
                    <span v-else-if="payment_status ==='1'" class="col-6 col-md-8">
                      <span v-if="payment_method='CREDIT'">信用卡一次付清</span>
                      <span v-else-if="payment_method='VACC'">ATM轉帳</span>
                      <span v-else-if="payment_method='CVS'">超商代碼繳費</span>
                    </span>
                  </div>

                  <div class="row">
                    <span class="col-6 col-md-4">付款狀態:</span>
                    <span v-if="payment_status ==='0'" class="col-6 col-md-8">尚未付款</span>
                    <span
                      v-else-if="payment_status ==='1'"
                      class="col-6 col-md-8 text-danger font-weight-bold"
                    >已付款</span>
                    <span
                      v-else-if="payment_status ==='2'"
                      class="col-6 col-md-8 text-danger font-weight-bold"
                    >信用卡驗證失敗，請重新付款</span>
                  </div>

                  <div class="row">
                    <span class="col-6 col-md-4">付款方式簡介:</span>
                    <span v-if="payment_status ==='0'" class="col-6 col-md-8">無</span>
                    <span v-else-if="payment_status ==='1'" class="col-6 col-md-8">
                      <span v-if="payment_method='CREDIT'">信用卡一次付清</span>
                      <span v-else-if="payment_method='VACC'">ATM轉帳</span>
                      <span v-else-if="payment_method='CVS'">超商代碼繳費</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-3">
            <div v-if="payment_status === '0' || payment_status === '2' " class="col-12 col-md-12">
              <router-link to="/payment" class="w-100 btn btn-success">付款去</router-link>
            </div>

            <div v-else-if="payment_status === '1' " class="col-12 col-md-12">
              <router-link to="/products" class="w-100 btn btn-info">繼續購物</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import orderAPI from '@/apis/order'
import couponAPI from '@/apis/coupons'
import Spinner from '@/components/Spinner'
import { detailedTimeFilter, currencyFilter, emptyImageFilter } from '@/utils/mixins'
import { Toast } from '@/utils/helpers'

export default {
  mixins: [detailedTimeFilter, currencyFilter, emptyImageFilter],
  components: {
    Spinner
  },
  data () {
    return {
      order: {},
      orderId: 0,
      order_status: null,
      orderItems: [],
      checkoutPrice: 0,
      shipping_fee: 0,
      coupon_discount_fee: 0,
      total_amount: 0,
      payment: [],
      payment_status: null,
      payment_method: null,
      shipping: [],
      status: false,
      isProcessing: false,
      couponData: {},
      isLoading: false,
      showCoupon: false
    }
  },
  created () {
    this.fetchOrder()
    this.fetchCoupon()
  },
  methods: {
    async fetchOrder () {
      const vm = this
      try {
        vm.isLoading = true

        const { data, statusText } = await orderAPI.getOrder()

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        // 訂單資訊
        vm.order = data.order
        // 訂單編號
        vm.orderId = data.order.id
        // 訂單狀態
        vm.order_status = data.order.order_status
        // 訂單商品資訊
        vm.orderItems = data.order.items
        vm.orderItems.map(d => d.id * d.id).reduce((a, b) => a + b)
        // 商品總價
        vm.checkoutPrice = data.order.checkoutPrice
        // 運費金額
        vm.shipping_fee = data.order.shipping_fee
        // // 折扣金額
        vm.coupon_discount_fee = data.order.discount_fee
        // 結帳金額
        vm.total_amount = data.order.total_amount

        // 付款資訊
        vm.payment = data.payment
        vm.payment_status = data.payment.payment_status
        vm.payment_method = data.payment.payment_method

        // 運送資訊
        vm.shipping = data.shipping

        vm.$store.commit('setNavbarCartItemNumber', 0)
        vm.isLoading = false
      } catch (error) {
        vm.isLoading = false
        if (this.orderItems.length > 1) {
          Toast.fire({
            type: 'error',
            title: '無法取得訂單資料，請稍後再試'
          })
        }
      }
    },
    async fetchCoupon () {
      const vm = this
      try {
        vm.isLoading = true

        const { data, statusText } = await couponAPI.getCoupon()

        // 若為 error 代表目前尚無 coupon 資訊，終止執行
        if (data.status === 'error') {
          vm.showCoupon = false
          return
        }

        if (statusText !== 'OK') {
          vm.showCoupon = false
          throw new Error(statusText)
        }

        // 優惠券資訊
        vm.couponData = data.couponData

        vm.showCoupon = true
        vm.isLoading = false
      } catch (error) {
        vm.showCoupon = false
        vm.isLoading = false
        Toast.fire({
          type: 'error',
          title: '無法取得優惠券資料，請稍後再試'
        })
      }
    },
    async collapseStatusChange () {
      this.status = !this.status
    }
  }
}
</script>

<style>
template {
  min-width: 375px;
  width: 100%;
}

.step {
  position: relative;
  z-index: 3;
}

.step .step-point-line {
  position: relative;
}

.step .step-point-line::after {
  content: '';
  display: block;
  position: absolute;
  z-index: -1;
  height: 2px;
  border-bottom: 2px solid #343a40;
}

.step .step-point {
  position: relative;
}

@media screen and (min-width: 768px) {
  .step .step-point-line::after {
    right: -100px;
    top: 24px;
    width: 200px;
  }

  .step .step-point::before {
    content: '';
    display: block;
    position: absolute;
    z-index: 0;
    right: 80px;
    top: 20px;
    width: 10px;
    height: 10px;
    background-color: #343a40;
    border-radius: 500px;
    animation-name: point;
    animation-duration: 2s;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
  }

  .step-by-step {
    padding: 12px 18px;
    margin-bottom: 18px;
  }

  .item-data {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .item-quantity,
  .item-total {
    margin: auto;
  }

  .item-quantity .item-quantity-text {
    display: none;
  }
}

@media screen and (min-width: 768px) {
  .step .step-point-line::after {
    right: -100px;
    top: 24px;
    width: 200px;
  }

  .step .step-point::before {
    content: '';
    display: block;
    position: absolute;
    z-index: 0;
    right: 80px;
    top: 20px;
    width: 10px;
    height: 10px;
    background-color: #343a40;
    border-radius: 500px;
    animation-name: point;
    animation-duration: 2s;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
  }

  .step-by-step {
    padding: 12px 18px;
    margin-bottom: 18px;
  }

  .item-data {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .item-quantity,
  .item-total {
    margin: auto;
  }

  .item-quantity .item-quantity-text {
    display: none;
  }

  .hidden-Except-Mobile {
    content: '';
    display: none;
  }
}

@media screen and (max-width: 767.98px) {
  .step .step-point-line::after {
    right: -60px;
    top: 24px;
    width: 120px;
  }

  .step .step-text {
    font-size: 14px;
    font-weight: normal;
  }

  .step-by-step {
    padding: 12px;
    margin-bottom: 12px;
    font-size: 14px;
  }

  .hidden-In-Mobile {
    content: '';
    display: none;
  }

  .cart-promotions {
    font-size: 14px;
  }

  .item-data {
    position: relative;
    padding-top: 30px;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .item-name {
    font-size: 14px;
  }

  .item-price .sell_price {
    font-size: 14px;
  }

  .item-price .original-price {
    font-size: 12px;
  }

  .item-quantity {
    margin-top: 14px;
    text-align: left !important;
  }

  .item-quantity .item-quantity-text {
    display: inline-block;
  }

  .item-total {
    margin-top: 16px;
    text-align: right !important;
    font-weight: bolder;
  }

  .order-summary {
    font-size: 16px;
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
