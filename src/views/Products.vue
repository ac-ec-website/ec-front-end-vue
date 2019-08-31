<template>
  <div class="container py-5">
    <Searchbar @filter-search="filterSearch" />
    <CategoryTab :categories="categories" @filter-category="filterCategory" />
    <SideCartPreview
      :initial-cart="cart"
      v-show="showSideCart"
      @clickDeleteItem="handleDeleteItem"
    />

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
import { Toast } from '@/utils/helpers'
import productsAPI from '@/apis/products'
import ProductsCard from '@/components/ProductsCard'
import Pagination from '@/components/Pagination'
import SideCartPreview from '@/components/SideCartPreview'
import CategoryTab from '@/components/CategoryTab'
import Searchbar from '@/components/Searchbar'

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
      try {
        const vm = this
        const response = await productsAPI.getProducts()

        console.log('商品資料', response)

        if (response.statusText !== 'OK') {
          throw new Error(statusText)
        }

        vm.products = response.data.products
        vm.filterProducts = vm.products
        vm.cart = response.data.cart
        vm.categories = response.data.categories
        vm.$store.commit('setNavbarCartItemNumber', response.data.cart.items.length)
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法取得所有商品資料，請稍後再試'
        })
      }
    },
    async handleDeleteItem(cartId, cartItemId) {
      try {
        const vm = this

        const { statusText } = await productsAPI.deleteItem(cartId, cartItemId)

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        vm.fetchProducts()
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法刪除購物車商品，請稍後再試'
        })
      }
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
    ProductsCard,
    Pagination,
    SideCartPreview,
    CategoryTab,
    Searchbar
  }
}
</script>