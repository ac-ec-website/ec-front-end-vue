<template>
  <div class="container py-5">
    <SideCartPreview
      :initial-cart="cart"
      v-show="showSideCart"
      @clickDeleteItem="handleDeleteItem"
    />
    <ProductDetail :initial-product="product" @clickAddToCart="handleAddToCart" />
  </div>
</template>

<script>
import { Toast } from '@/utils/helpers'
import productsAPI from '@/apis/products'
import cartAPI from '@/apis/cart'
import ProductDetail from '../components/ProductDetail'
import SideCartPreview from '../components/SideCartPreview'
import { constants } from 'crypto'

export default {
  components: {
    ProductDetail,
    SideCartPreview
  },
  data() {
    return {
      product: {},
      cart: {},
      showSideCart: false
    }
  },
  watch: {
    '$route.params.productId': function(productId) {
      this.fetchProduct(productId)
    }
  },
  created() {
    const productId = this.$route.params.productId
    this.fetchProduct(productId)
  },
  mounted() {
    this.$root.$on('toggleSideCart', () => {
      this.showSideCart = !this.showSideCart
    })
  },
  methods: {
    async fetchProduct(productId) {
      try {
        const vm = this
        const response = await productsAPI.getProduct(productId)

        if (response.statusText !== 'OK') {
          throw new Error(statusText)
        }

        vm.product = response.data.product
        vm.cart = response.data.cart
        vm.$store.commit('setNavbarCartItemNumber', response.data.cart.items.length)
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法取得單一商品資料，請稍後再試'
        })
      }
    },
    async handleAddToCart(productId, quantity) {
      try {
        const vm = this

        const response = await cartAPI.addToCart(productId, quantity)

        if (response.statusText !== 'OK') {
          throw new Error(statusText)
        }

        Toast.fire({
          type: 'success',
          title: '商品成功加入購物車！'
        })

        vm.fetchProduct(productId)
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法加入購物車，請稍後再試'
        })
      }
    },
    async handleDeleteItem(cartId, cartItemId) {
      try {
        const vm = this
        const productId = vm.$route.params.productId

        const { statusText } = await productsAPI.deleteItem(cartId, cartItemId)

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        vm.fetchProduct(productId)
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法刪除購物車商品，請稍後再試'
        })
      }
    }
  }
}
</script>