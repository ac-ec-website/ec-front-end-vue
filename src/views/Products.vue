<template>
  <div class="container py-5">
    <SideCartPreview
      :initial-cart="cart"
      v-show="showSideCart"
      @clickDeleteItem="handleDeleteItem"
    />
    <!-- 類別標籤  -->
    <!-- <NavCate :categories="categories" /> -->

    <div class="row">
      <!-- 產品卡片 -->
      <ProductsCard v-for="product in products" :key="product.id" :initial-product="product" />
    </div>

    <!-- 分頁標籤  -->
    <!-- <Pagination v-if="totalPage > 1" :category-id="categoryId" :current-page="currentPage" :total-page="totalPage" /> -->
  </div>
</template>

<script>
import axios from "axios";
import ProductsCard from "@/components/ProductsCard";
import NavCate from "@/components/NavCate";
import Pagination from "@/components/Pagination";
import SideCartPreview from "@/components/SideCartPreview";

export default {
  data() {
    return {
      // categories: [],
      // categoryId: '',
      // currentPage: 1,
      products: [],
      cart: {},
      showSideCart: false
      // totalPage: 0
    };
  },
  created() {
    this.fetchProducts();
  },
  mounted() {
    this.$root.$on("toggleSideCart", () => {
      this.showSideCart = !this.showSideCart;
    });
  },
  methods: {
    async fetchProducts() {
      axios.defaults.withCredentials = true;

      const api = "https://ec-website-api.herokuapp.com/api/products";
      const vm = this;
      const response = await vm.axios.get(api);
      console.log(response);

      if (response.statusText !== "OK") {
        throw new Error(statusText);
      }
      vm.products = response.data.products;
      vm.cart = response.data.cart;
    },
    handleDeleteItem(cartId, cartItemId) {
      console.log(cartId, cartItemId);
      const productId = this.$route.params.productId;
      const vm = this;
      axios.defaults.withCredentials = true;
      axios
        .delete(
          `https://ec-website-api.herokuapp.com/api/cart/${cartId}/cartItem/${cartItemId}`
        )
        .then(function(response) {
          vm.fetchProducts();
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  components: {
    NavCate,
    ProductsCard,
    Pagination,
    SideCartPreview
  }
};
</script>