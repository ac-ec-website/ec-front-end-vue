<template>
  <div class="container py-5">
    <Searchbar @filter-search="filterSearch" />
    <CategoryTab :categories="categories" @filter-category="filterCategory" />
    <SideCartPreview :initial-cart="cart" v-show="showSideCart" @clickDeleteItem="handleDeleteItem" />

    <div class="row">
      <!-- 產品卡片 -->
      <ProductsCard v-for="product in filterProducts" :key="product.id" :initial-product="product" />
    </div>
    <div class="text-center">
      <div v-if="filterProducts.length === 0">喔！沒有此商品QAQ</div>
    </div>

    <!-- 分頁標籤  -->
    <!-- <Pagination v-if="totalPage > 1" :category-id="categoryId" :current-page="currentPage" :total-page="totalPage" /> -->
  </div>
</template>

<script>
import axios from 'axios'
import ProductsCard from '@/components/ProductsCard'
import NavCate from '@/components/NavCate'
import Pagination from '@/components/Pagination'
import SideCartPreview from '@/components/SideCartPreview'
import CategoryTab from '@/components/CategoryTab'
import Searchbar from '@/components/Searchbar'
import JQuery from 'jquery'
let $ = JQuery

export default {
  data() {
    return {
      categories: [],
      // currentPage: 1,
      products: [],
      filterProducts: [],
      cart: {},
      showSideCart: false
      // totalPage: 0
    }
  },
  created() {
    this.fetchProducts()
  },
  mounted() {
    this.$root.$on('toggleSideCart', () => {
      this.showSideCart = !this.showSideCart
    })
  },
  methods: {
    async fetchProducts() {
      axios.defaults.withCredentials = true

      const api = 'https://ec-website-api.herokuapp.com/api/products'
      const vm = this
      const response = await vm.axios.get(api)
      console.log(response)

      if (response.statusText !== 'OK') {
        throw new Error(statusText)
      }
      vm.products = response.data.products
      vm.filterProducts = vm.products
      vm.cart = response.data.cart
      vm.categories = response.data.categories
      this.$store.commit('setNavbarCartItemNumber', response.data.cart.items.length)
    },
    handleDeleteItem(cartId, cartItemId) {
      console.log(cartId, cartItemId)
      const productId = this.$route.params.productId
      const vm = this
      axios.defaults.withCredentials = true
      axios
        .delete(`https://ec-website-api.herokuapp.com/api/cart/${cartId}/cartItem/${cartItemId}`)
        .then(function(response) {
          vm.fetchProducts()
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    filterCategory(categoryId) {
      if (categoryId === undefined) {
        this.filterProducts = this.products
        return
      }
      this.filterProducts = this.products.filter(product => {
        if (product.CategoryId === categoryId) {
          return product
        }
      })
    },
    filterSearch(inputText) {
      if (inputText === '') {
        this.filterProducts = this.products
        return
      }
      this.filterProducts = this.products.filter(product => {
        if (product.name.indexOf(inputText) > 0 || product.Category.name.indexOf(inputText) > 0) {
          return product
        }
      })
    }
  },
  components: {
    NavCate,
    ProductsCard,
    Pagination,
    SideCartPreview,
    CategoryTab,
    Searchbar
  }
}
</script>