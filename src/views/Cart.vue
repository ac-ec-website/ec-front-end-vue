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
              <div class="col-4 col-md-3 text-center item-quantity my-auto">
                <div class="input-group">
                  <span class="input-group-btn">
                    <div
                      class="btn btn-default btn-quantity-decrease"
                      @click.stop.prevent="subItemFromCart(cartId,product.CartItem.id)"
                    >
                      <i class="fa fa-minus"></i>
                    </div>
                  </span>
                  <span class="form-control text-center">{{product.CartItem.quantity}}</span>
                  <span class="input-group-btn">
                    <div
                      class="btn btn-default btn-quantity-increase"
                      @click.stop.prevent="addItemToCart(cartId,product.CartItem.id)"
                    >
                      <i class="fa fa-plus"></i>
                    </div>
                  </span>
                </div>
              </div>

              <!-- 小計欄位 -->
              <div class="col-4 col-md-2 text-center item-total my-auto">
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

            <hr class="cart-promotions-hr d-none" />

            <div class="row cart-promotions d-none">
              <h5 class="col-12">已享用之優惠</h5>
              <div class="col-12 promotion-coupon">
                <div class="row text-center p-3">
                  <span
                    class="col-4 col-md-2 ccoupon-name bg-success text-light my-auto py-2"
                  >{{couponData.name}}</span>
                  <span
                    class="col-4 col-md-3 my-auto py-2 coupon-description"
                  >{{couponData.description}}</span>
                  <span class="col-4 col-md-7 my-auto py-2 text-right discount">
                    <div class="row">
                      <span class="col-12">- NT {{coupon_discount_fee | currency}}</span>
                      <a class="col-12 text-right text-danger" @click.stop.prevent="deleteCoupon">刪除</a>
                    </div>
                  </span>
                </div>
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
                    <label for="cart-delivery-method">
                      配送方式
                      <span class="text-danger">*</span>
                    </label>
                    <span class="select-cart-form">
                      <select
                        id="cart-delivery-method"
                        class="form-control"
                        v-model="shipping_method"
                        @change="TrackShippingMethod()"
                        required
                      >
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
                <div class="row subtotal">
                  <span class="col-8 col-md-6 text-left">小計:</span>
                  <span class="col-4 col-md-6 text-right">NT {{total_amount | currency}}</span>
                </div>

                <div class="row discount-fee">
                  <span class="col-8 col-md-6 text-left">折扣:</span>
                  <span class="col-4 col-md-6 text-right">- NT {{coupon_discount_fee | currency}}</span>
                </div>

                <div class="row delivery-fee">
                  <span class="col-8 col-md-6 text-left">運費:</span>
                  <span class="col-4 col-md-6 text-right">NT {{shipping_fee | currency}}</span>
                </div>

                <div class="row cart-coupon mt-3">
                  <div
                    v-if="!isCounponActivated"
                    class="col-12 btn btn-link use-coupon text-left"
                    @click.stop.prevent="activatedCounpon"
                  >使用促銷代碼</div>
                  <div v-else class="col-12 text-left">
                    <div class="form-group">
                      <label for="couponCode">促銷代碼</label>
                      <div>
                        <div class="input-group">
                          <input
                            type="text"
                            v-model="couponCode"
                            id="couponCode"
                            class="form-control"
                            name="couponCode"
                            :disabled="isBlocking"
                          />
                          <div class="input-group-append">
                            <button
                              class="btn btn-primary"
                              :disabled="isBlocking"
                              @click.stop.prevent="postCoupon"
                            >{{ isBlocking ? "已成功使用" : "輸入優惠券" }}</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr class="ng-scope" />
                <div class="row total ng-scope">
                  <span class="col-8 col-md-6 text-left">
                    合計
                    <span class="hidden-sm hidden-md hidden-lg">({{cartItems.length}} 件)</span>:
                  </span>
                  <span
                    class="col-4 col-md-6 text-right font-weight-bold"
                  >NT {{total_amount + shipping_fee - coupon_discount_fee | currency}}</span>
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
</style>

<script>
import cartAPI from '@/apis/cart'
import couponAPI from '@/apis/coupons'
import { emptyImageFilter, currencyFilter } from '@/utils/mixins'
import { Toast } from '@/utils/helpers'

export default {
  mixins: [currencyFilter, emptyImageFilter],
  data() {
    return {
      cartId: null,
      cartItems: [],
      total_amount: 0,
      shipping_fee: 60,
      shipping_method: '住家宅配',
      isCounponActivated: false,
      couponData: {},
      couponCode: '',
      coupon_discount_fee: 0,
      isBlocking: false
    }
  },
  created() {
    this.fetchCart()
    this.fetchCoupon()
  },
  methods: {
    async fetchCart() {
      try {
        const vm = this

        const { data, statusText } = await cartAPI.getCart()

        // 若此時 cartId 為空時，則中斷執行，引導使用者回產品頁面繼續購物
        if (data.status === 'error') {
          return
        }

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        // 購物車 Id
        vm.cartId = data.cart.id
        // 購物車內商品資訊
        vm.cartItems = data.cart.items

        vm.$store.commit('setNavbarCartItemNumber', vm.cartItems.length)

        if (vm.cartItems.length < 1) {
          return
        }
        vm.cartItems.map(d => d.id * d.id).reduce((a, b) => a + b)
        // 購物車總價
        vm.total_amount = data.total_amount
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法取得購物車資料，請稍後再試'
        })
      }
    },
    async TrackShippingMethod() {
      const vm = this

      if (vm.shipping_method === '住家宅配') {
        vm.shipping_fee = 60
      }

      if (vm.shipping_method === '其他') {
        vm.shipping_fee = 100
      }
    },
    async addItemToCart(cartId, cartItemId) {
      try {
        const vm = this

        const { data, statusText } = await cartAPI.addItemToCart(cartId, cartItemId)

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        vm.fetchCart(cartId)
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法增加商品數量，請稍後再試'
        })
      }
    },
    async subItemFromCart(cartId, cartItemId) {
      try {
        const vm = this

        const { data, statusText } = await cartAPI.subItemFromCart(cartId, cartItemId)

        // 若是使用者讓商品數量歸 0，則呼叫刪除功能
        if (data.cartItem[0].quantity === 0) {
          vm.deleteItemFromCart(cartId, cartItemId)
        }

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        vm.fetchCart(cartId)
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法刪減商品數量，請稍後再試'
        })
      }
    },
    async deleteItemFromCart(cartId, cartItemId) {
      try {
        const vm = this

        const { data, statusText } = await cartAPI.deleteItemFromCart(cartId, cartItemId)

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        vm.fetchCart(cartId)
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法移除該商品，請稍後再試'
        })
      }
    },
    async putCart() {
      try {
        const vm = this

        const shippingData = {
          shipping_method: vm.shipping_method
        }

        const { data, statusText } = await cartAPI.putCart(shippingData)

        if (statusText !== 'OK' || data.status !== 'success') {
          throw new Error(statusText)
        }

        Toast.fire({
          type: 'success',
          title: '配送資訊已更新'
        })

        vm.$router.push({ name: 'orderCreate' })
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法更新配送資訊，請稍後再試'
        })
      }
    },
    activatedCounpon() {
      const vm = this
      vm.isCounponActivated = true
    },
    async postCoupon(e) {
      const vm = this
      try {
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

        console.log('優惠券 data', data)

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
          vm.coupon_discount_fee = vm.shipping_fee
          console.log('運費', vm.coupon_discount_fee)
        }

        // 折價相關
        if (couponData.type === 1 && couponData.product_reduce !== null) {
          vm.coupon_discount_fee = couponData.product_reduce
          console.log('折價', vm.coupon_discount_fee)
        }

        // 打折相關
        if (couponData.type === 2 && couponData.percent !== null) {
          const discount = 1 - couponData.percent / 100
          vm.coupon_discount_fee = Math.round(vm.total_amount * discount)
          console.log('打折', vm.coupon_discount_fee)
        }

        vm.couponData = couponData

        Toast.fire({
          type: 'success',
          title: '優惠券可成功使用，請確認'
        })

        // 限訂單次使用
        vm.isBlocking = true
        document.querySelector('.cart-promotions-hr').classList.remove('d-none')
        document.querySelector('.cart-promotions').classList.remove('d-none')
      } catch (error) {
        vm.isBlocking = false
        Toast.fire({
          type: 'error',
          title: '暫時無法使用 coupon 券，請稍後再試'
        })
      }
    },
    async deleteCoupon() {
      const vm = this
      try {
        const { data, statusText } = await couponAPI.deleteCoupon()

        console.log('優惠券 data', data)

        document.querySelector('.cart-promotions-hr').classList.add('d-none')
        document.querySelector('.cart-promotions').classList.add('d-none')

        vm.isCounponActivated = false
        vm.isBlocking = false

        // 清空 coupon 資料
        vm.couponData = {}
        vm.couponCode = ''
        vm.coupon_discount_fee = 0
      } catch (error) {
        vm.isCounponActivated = true
        vm.isBlocking = true
        console.log('error', error)
      }
    },
    async fetchCoupon() {
      try {
        const vm = this

        const { data, statusText } = await couponAPI.getCoupon()

        console.log('優惠券資料', data)

        // 若為 error 代表目前尚無 coupon 資訊，終止執行
        if (data.status === 'error') {
          return
        }

        if (statusText !== 'OK') {
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

        Toast.fire({
          type: 'success',
          title: '取得優惠券資訊，請確認'
        })

        document.querySelector('.cart-promotions-hr').classList.remove('d-none')
        document.querySelector('.cart-promotions').classList.remove('d-none')

        vm.isCounponActivated = true
        vm.couponCode = data.couponData.coupon_code
        vm.isBlocking = true
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法取得優惠券資料，請稍後再試'
        })
      }
    }
  }
}
</script>
