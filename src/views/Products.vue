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
      <ProductsCard
        v-for="product in filterProducts"
        :key="product.id"
        :initial-product="product"
        @add-to-cart="handleAddToCart"
      />
    </div>
    <Spinner v-if="isLoading" />
    <div class="text-center">
      <div v-if="isNoProduct">喔！沒有此商品QAQ</div>
    </div>

    <!-- 分頁標籤  -->
    <!-- <Pagination v-if="totalPage > 1" :category-id="categoryId" :current-page="currentPage" :total-page="totalPage" /> -->
  </div>
</template>

<script>
import { Toast } from '@/utils/helpers'
import productsAPI from '@/apis/products'
import cartAPI from '@/apis/cart'
import ProductsCard from '@/components/ProductsCard'
// import Pagination from '@/components/Pagination'
import SideCartPreview from '@/components/SideCartPreview'
import CategoryTab from '@/components/CategoryTab'
import Searchbar from '@/components/Searchbar'
import Spinner from '@/components/Spinner'

export default {
  data() {
    return {
      categories: [],
      // currentPage: 1,
      products: [],
      filterProducts: [],
      cart: {},
      showSideCart: false,
      isLoading: true,
      isNoProduct: false,
      filterInputText: '',
      filterCategoryId: undefined
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
        vm.isNoProduct = false

        console.log('商品資料', response)

        if (response.statusText !== 'OK') {
          throw new Error(response.statusText)
        }

        vm.products = response.data.products
        vm.filterProducts = vm.products
        vm.cart = response.data.cart
        vm.categories = response.data.categories
        vm.$store.commit('setNavbarCartItemNumber', response.data.cart.items.length)

        vm.isLoading = false
        this.checkIsNoProduct()
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
      this.filterCategoryId = categoryId
      this.handleFilterProducts()
      this.checkIsNoProduct()
    },
    filterSearch(inputText) {
      this.filterInputText = inputText
      this.handleFilterProducts()
      this.checkIsNoProduct()
    },
    async handleAddToCart(productId, quantity) {
      try {
        const vm = this

        const response = await cartAPI.addToCart(productId, quantity)

        if (response.statusText !== 'OK') {
          throw new Error(response.statusText)
        }

        Toast.fire({
          type: 'success',
          title: '商品成功加入購物車！'
        })

        vm.fetchProducts()
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法加入購物車，請稍後再試'
        })
      }
    },
    handleFilterProducts() {
      const vm = this
      vm.filterProducts = vm.products
      vm.isNoProduct = false

      if (vm.filterCategoryId !== undefined) {
        vm.filterProducts = vm.filterProducts.filter(product => {
          if (product.CategoryId === vm.filterCategoryId) {
            return product
          }
        })
      }

      if (vm.filterInputText !== '') {
        vm.filterProducts = vm.filterProducts.filter(product => {
          if (product.name.indexOf(vm.filterInputText) > 0 || product.Category.name.indexOf(vm.filterInputText) > 0) {
            return product
          }
        })
      }
    },
    checkIsNoProduct() {
      if (this.filterProducts.length === 0) {
        this.isNoProduct = true
      }
    }
  },
  components: {
    ProductsCard,
    // Pagination,
    SideCartPreview,
    CategoryTab,
    Searchbar,
    Spinner
  }
}
</script>