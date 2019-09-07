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
            <p class="text-dark h6">填寫資料</p>
          </div>
          <div class="col text-center">
            <span
              class="border bg-secondary px-4 py-2 rounded-pill text-dark mb-3 d-inline-block"
            >Step 3</span>
            <p class="text-dark h6">訂單確認與付款</p>
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
            <h4>合計: NT {{total_amount + shipping_fee - coupon_fee | currency}}</h4>
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

                <div class="col-12 coupon-fee">
                  <!-- ::TODO:: 優惠券 -->
                  <div class="col-9 d-inline-block">優惠券:</div>
                  <div class="col-3 d-inline-block">- NT {{coupon_fee | currency}}</div>
                </div>

                <div class="col-12 total">
                  <div class="col-9 d-inline-block">合計:</div>
                  <div
                    class="col-3 d-inline-block font-weight-bold"
                  >NT {{total_amount + shipping_fee - coupon_fee | currency}}</div>
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
        <!-- 2. 優惠券 -->
        <section class="coupon-form">
          <div class="row section-header">
            <span class="col-12 px-0">優惠券</span>
          </div>
          <div class="section-body">
            <div name="couponForm">
              <div class="input-group">
                <input
                  type="text"
                  v-model="couponCode"
                  class="form-control"
                  name="couponCode"
                  :disabled="isBlocking"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-primary"
                    :disabled="isBlocking"
                    @click.stop.prevent="postCoupon"
                  >{{ isBlocking? "已成功使用" : "輸入優惠券" }}</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- 3. 訂單備註 -->
        <section class="remark-form">
          <div class="row section-header">
            <span class="col-12 px-0">訂單備註</span>
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
            <span class="col-6 px-0">送貨資料</span>
            <span class="col-6 px-0 text-right">運費: NT {{shipping_fee}}</span>
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
            <span class="col-12 px-0">付款資料</span>
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
            >合計:&nbsp;&nbsp;NT {{total_amount + shipping_fee - coupon_fee | currency}}</div>
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

<script>
import cartAPI from '@/apis/cart'
import orderAPI from '@/apis/order'
import couponAPI from '@/apis/coupons'
import { emptyImageFilter, currencyFilter } from '@/utils/mixins'
import { Toast } from '@/utils/helpers'

export default {
  mixins: [currencyFilter, emptyImageFilter],
  data() {
    return {
      cartId: 0,
      cartItems: [],
      total_amount: 0,
      shipping_fee: 0,
      shipping_method: '',
      status: false,
      shippingFormStatus: false,
      customerName: '皮爾斯',
      customerEmail: 'pp@gmail.com',
      customerPhone: '0912345678',
      customerAddress: '台北市中正區工程路66號',
      tempName: '',
      tempPhone: '',
      tempAddress: '',
      couponCode: '',
      coupon_fee: 0,
      isProcessing: false,
      isBlocking: false
    }
  },
  created() {
    this.fetchCart()
  },
  methods: {
    async fetchCart() {
      try {
        const vm = this

        const { data, statusText } = await cartAPI.getCart()

        console.log('訂單創建頁面 購物車內容', data)

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
        vm.total_amount = data.total_amount

        // 運送方式
        vm.shipping_method = data.cart.shipping_method
        // 運費
        vm.shipping_fee = data.cart.shipping_fee
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法取得購物車資料，請稍後再試'
        })
      }
    },
    async postOrder(e) {
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
    async collapseStatusChange() {
      this.status = !this.status
    },
    async automaticFillIn() {
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
    async postCoupon(e) {
      try {
        const vm = this

        if (!vm.couponCode) {
          Toast.fire({
            type: 'warning',
            title: '請輸入 couponCode 優惠碼呦！'
          })
          return
        }

        const couponCode = {
          couponCode: vm.couponCode
        }

        const { data, statusText } = await couponAPI.postCoupon(couponCode)

        if (data.status === 'error-notFound') {
          Toast.fire({
            type: 'warning',
            title: '查無此優惠券，請再次確認'
          })
          return
        }

        if (data.status === 'error-cantBeUsed') {
          Toast.fire({
            type: 'warning',
            title: '該優惠券已被使用完畢 哭哭QQ'
          })
          return
        }

        if (statusText !== 'OK' || data.status !== 'success') {
          throw new Error(statusText)
        }

        console.log('優惠券 data', data)

        const couponData = data.couponData

        // 運費相關
        if (couponData.type === 0 && couponData.shipping_free === 1) {
          vm.coupon_fee = vm.shipping_fee
          console.log('運費', vm.coupon_fee)
        }

        // 折價相關
        if (couponData.type === 1 && couponData.product_reduce !== null) {
          vm.coupon_fee = couponData.product_reduce
          console.log('折價', vm.coupon_fee)
        }

        // 打折相關
        if (couponData.type === 2 && couponData.percent !== null) {
          const discount = 1 - couponData.percent / 100
          vm.coupon_fee = Math.round(vm.total_amount * discount)
          console.log('打折', vm.coupon_fee)
        }

        Toast.fire({
          type: 'success',
          title: '訂單可成功使用，請確認'
        })

        // 限訂單次使用
        vm.isBlocking = true
      } catch (error) {
        vm.isBlocking = false
        Toast.fire({
          type: 'error',
          title: '暫時無法使用 coupon 券，請稍後再試'
        })
      }
    }
  }
}
</script>


<style>
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
  content: '';
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
    content: '';
    display: none;
  }

  .hidden-In-Mobile {
    content: '';
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