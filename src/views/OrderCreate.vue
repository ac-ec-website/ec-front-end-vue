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
          <div class="col-4 text-center step-point-line step-point">
            <span class="step-by-step bg-dark rounded-pill text-light d-inline-block">Step 2</span>
            <p class="step-text text-dark">填寫資料</p>
          </div>
          <div class="col-4 text-center">
            <span
              class="step-by-step border bg-secondary rounded-pill text-dark d-inline-block"
            >Step 3</span>
            <p class="step-text text-dark">訂單確認與與付款</p>
          </div>
        </div>
      </div>
    </div>

    <Spinner v-if="isLoading" />

    <div v-else>
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
            <div class="card-header text-center py-3 border">
              <b>
                合計&nbsp;(
                <span class="sl-cart-count ng-isolate-scope">{{cartItems.length}}</span>
                &nbsp;件): &nbsp; NT {{total_amount + shipping_fee - coupon_discount_fee | currency}}
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

            <div id="cartSummary" class="collapse">
              <div class="card-body border pt-3 pb-0 hidden-In-Mobile">
                <div class="row mb-3">
                  <div class="col-md-5">商品資料</div>
                  <div class="col-md-3 text-center">單件價格</div>
                  <div class="col-md-2 text-center">數量</div>
                  <div class="col-md-2 text-center item-total">小計</div>
                </div>
              </div>

              <div class="card-body border py-0">
                <div v-for="product in cartItems" :key="product.id" class="row item-data">
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
                    <span>{{product.CartItem.quantity}}</span>
                  </div>

                  <!-- 小計欄位 -->
                  <div class="col-6 col-md-2 item-total text-center">
                    <span
                      class="total-count"
                    >NT {{product.sell_price * product.CartItem.quantity | currency}}</span>
                  </div>
                </div>
              </div>

              <div v-if="showCoupon || showDiscount" class="card-body cart-promotions pt-0">
                <div class="row mt-3">
                  <b class="col-12">已享用之優惠</b>
                  <!-- 特價活動 -->
                  <div v-if="discountData.id" class="col-12 promotion-discount">
                    <div class="row text-center p-3">
                      <span
                        class="col-7 col-md-4 discount-name bg-warning my-auto py-2"
                      >特價活動 - {{discountData.name}}</span>
                      <span
                        class="col-5 col-md-3 my-auto py-2 bg-light discount-description"
                      >{{discountData.description}}</span>
                      <span
                        class="col-12 col-md-5 my-auto py-2 text-right discount bg-light font-weight-bold"
                      >
                        <div class="row">
                          <span class="col-12">- NT {{coupon_discount_fee | currency}}</span>
                        </div>
                      </span>
                    </div>
                  </div>
                  <!-- 優惠券 -->
                  <div
                    v-if="!discountData.id && couponData.length !== null"
                    class="col-12 promotion-coupon"
                  >
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

      <!-- 表單區 -->
      <form class="row mt-3" @submit.stop.prevent="postOrder">
        <!-- 左側 -->
        <div class="col-sm-6">
          <!-- 1. 客戶資料 -->
          <section class="customer-form">
            <div class="row section-header">
              <b class="col-12 px-0">顧客資料</b>
            </div>
            <div class="section-body">
              <div name="customerForm">
                <div class="form-group">
                  <label for="order-customer-name" class="control-label">
                    顧客名稱
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    v-model="customerName"
                    id="order-customer-name"
                    type="text"
                    class="form-control"
                    name="orderCustomerName"
                    placeholder="皮爾斯"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="order-customer-email" class="control-label">
                    電子信箱
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    v-model="customerEmail"
                    id="order-customer-email"
                    type="email"
                    class="form-control"
                    name="orderCustomerEmail"
                    placeholder="pp@gmail.com"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="order-customer-phone" class="control-label">
                    電話號碼
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    v-model="customerPhone"
                    id="order-customer-phone"
                    type="tel"
                    class="form-control"
                    name="orderCustomerPhone"
                    placeholder="0912345678"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="order-customer-address" class="control-label">
                    地址
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    v-model="customerAddress"
                    id="order-customer-address"
                    type="address"
                    class="form-control"
                    name="orderCustomerAddress"
                    placeholder="台北市中正區工程路66號"
                    required
                  />
                </div>
              </div>
            </div>
          </section>
          <!-- 3. 訂單備註 -->
          <section class="remark-form">
            <div class="row section-header">
              <b class="col-12 px-0">訂單備註</b>
            </div>
            <div class="section-body">
              <div name="remarksForm">
                <div class="form-group">
                  <textarea
                    id="order-remarks"
                    class="form-control"
                    name="orderRemark"
                    placeholder="有什麼想告訴賣家嗎？"
                  ></textarea>
                </div>
              </div>
            </div>
          </section>
        </div>
        <!-- 右側 -->
        <div class="col-sm-6">
          <!-- 3. 送貨資料 -->
          <section class="delivery-form">
            <div class="row section-header">
              <b class="col-6 px-0">送貨資料</b>
              <b class="col-6 px-0 text-right">運費: NT {{shipping_fee}}</b>
            </div>
            <div class="section-body">
              <p>已選擇的送貨方式: {{shipping_method}}</p>
              <div id="delivery-form-content">
                <div class="form-group">
                  <label class="control-label">
                    <input type="checkbox" v-model="shippingFormStatus" @change="automaticFillIn" /> 收件人資料與顧客資料相同
                  </label>
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="control-label">
                    收件人名稱
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    v-model="tempName"
                    id="recipient-name"
                    type="text"
                    class="form-control"
                    name="orderRecipientName"
                    required
                  />
                  <span>請填入收件人真實姓名，以確保順利收件</span>
                </div>
                <div class="form-group">
                  <label for="recipient-phone" class="control-label">
                    收件人電話號碼
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    v-model="tempPhone"
                    id="recipient-phone"
                    type="tel"
                    class="form-control"
                    name="orderRecipientPhone"
                    required
                  />
                </div>

                <hr />
                <div class="form-group">
                  <label for="recipient-address" class="control-label">
                    收件人地址
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    v-model="tempAddress"
                    id="recipient-address"
                    type="address"
                    class="form-control"
                    name="orderRecipientAddress"
                    required
                  />
                </div>
              </div>
            </div>
          </section>
          <!-- 3. 付款資料 -->
          <section class="payment-form">
            <div class="row section-header">
              <b class="col-12 px-0">付款資料</b>
            </div>
            <div class="row section-body">
              <div name="paymentForm" class="col-12">
                <div class="form-group">訂單支援的付款方式:</div>
                <ul>
                  <li>信用卡一次付清</li>
                  <li>ATM轉帳</li>
                  <li>超商代碼繳費</li>
                </ul>
              </div>
              <div
                class="col-12 font-weight-bold"
              >合計:&nbsp;&nbsp;NT {{total_amount + shipping_fee - coupon_discount_fee | currency}}</div>
            </div>
          </section>
        </div>

        <!-- 表單送出 -->
        <div class="col-12">
          <div class="card mt-3">
            <div class="card-body">
              <div class="row py-2">
                <!-- 左側 -->
                <div class="col-6 col-md-6 px-1">
                  <a href="#" class="btn btn-link" @click="$router.back()">
                    <i class="fas fa-arrow-left"></i>&ensp;返回購物車
                  </a>
                </div>
                <!-- 右側 -->
                <div class="col-6 col-md-6 px-1">
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
  </div>
</template>

<script>
import cartAPI from '@/apis/cart'
import orderAPI from '@/apis/order'
import couponAPI from '@/apis/coupons'
import Spinner from '@/components/Spinner'
import { emptyImageFilter, currencyFilter } from '@/utils/mixins'
import { Toast } from '@/utils/helpers'

export default {
  mixins: [currencyFilter, emptyImageFilter],
  components: {
    Spinner
  },
  data () {
    return {
      cartId: 0,
      cartItems: [],
      total_amount: 0,
      shipping_fee: 0,
      shipping_method: '',
      status: false,
      shippingFormStatus: false,
      customerName: '王大明',
      customerEmail: 'root@gmail.com',
      customerPhone: '0912345678',
      customerAddress: '台北市大師區工程路996號',
      tempName: '',
      tempPhone: '',
      tempAddress: '',
      isProcessing: false,
      couponData: {},
      coupon_discount_fee: 0,
      isLoading: false,
      showCoupon: false,
      discountData: {},
      showDiscount: false
    }
  },
  created () {
    this.fetchCart()
  },
  methods: {
    async fetchCart () {
      const vm = this
      try {
        vm.isLoading = true

        const { data, statusText } = await cartAPI.getCart()

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        // 購物車內商品資訊
        vm.cartItems = data.cart.items

        vm.$store.commit('setNavbarCartItemNumber', vm.cartItems.length)

        if (vm.cartItems.length < 1) {
          return
        }

        vm.cartItems.map(d => d.id * d.id).reduce((a, b) => a + b)
        // 購物車總價
        vm.total_amount = data.totalAmount

        // 運送方式
        vm.shipping_method = data.cart.shipping_method
        // 運費
        vm.shipping_fee = data.cart.shipping_fee

        if (data.discountData.id) {
          // 特價活動資訊
          vm.discountData = data.discountData
          vm.showDiscount = true
          vm.fetchDiscount()
        } else {
          // 取得優惠券資訊
          vm.fetchCoupon()
        }
        vm.isLoading = false
      } catch (error) {
        vm.isLoading = false
        Toast.fire({
          type: 'error',
          title: '無法取得購物車資料，請稍後再試'
        })
      }
    },
    async postOrder (e) {
      try {
        const vm = this

        const form = e.target
        const formData = new FormData(form)

        vm.isProcessing = true

        const { data, statusText } = await orderAPI.postOrder(formData)

        if (statusText !== 'OK' || data.status !== 'success') {
          throw new Error(statusText)
        }

        vm.isProcessing = false

        Toast.fire({
          type: 'success',
          title: '訂單已新增，請確認'
        })

        vm.$store.commit('setNavbarCartItemNumber', 0)
        vm.$router.push({ name: 'orderDetail' })
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          type: 'error',
          title: '無法新增訂單，請稍後再試'
        })
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

        // 運費相關
        if (vm.couponData.type === 0 && vm.couponData.shipping_free === 1) {
          vm.coupon_discount_fee = vm.shipping_fee
          console.log('運費', vm.coupon_discount_fee)
        }

        // 折價相關
        if (vm.couponData.type === 1 && vm.couponData.product_reduce !== null) {
          vm.coupon_discount_fee = vm.couponData.product_reduce
          console.log('折價', vm.coupon_discount_fee)
        }

        // 打折相關
        if (vm.couponData.type === 2 && vm.couponData.percent !== null) {
          const discount = 1 - vm.couponData.percent / 100
          vm.coupon_discount_fee = Math.round(vm.total_amount * discount)
          console.log('打折', vm.coupon_discount_fee)
        }
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
    },
    async automaticFillIn () {
      const vm = this
      if (vm.shippingFormStatus) {
        vm.tempName = vm.customerName
        vm.tempPhone = vm.customerPhone
        vm.tempAddress = vm.customerAddress
      } else {
        vm.tempName = ''
        vm.tempPhone = ''
        vm.tempAddress = ''
      }
    },
    fetchDiscount () {
      const vm = this
      vm.coupon_discount_fee = 0

      // 運費相關
      if (vm.discountData.type === 0 && vm.discountData.shipping_free === 1) {
        vm.coupon_discount_fee = vm.shipping_fee
      }

      // 折價相關
      if (vm.discountData.type === 1 && vm.discountData.product_reduce !== null) {
        vm.coupon_discount_fee = vm.discountData.product_reduce
      }

      // 打折相關
      if (vm.discountData.type === 2 && vm.discountData.percent !== null) {
        const discount = 1 - vm.discountData.percent / 100
        vm.coupon_discount_fee = Math.round(vm.total_amount * discount)
      }
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
    transform: translateX(12rem);
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
  background-color: #f6f6f6;
}

.section-body {
  padding: 15px 0px;
}
</style>
