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
import axios from "axios";
import ProductDetail from "../components/ProductDetail";
import SideCartPreview from "../components/SideCartPreview";
import { constants } from "crypto";

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
    };
  },
  watch: {
    "$route.params.productId": function(productId) {
      this.fetchProduct(productId);
    }
  },
  created() {
    const productId = this.$route.params.productId;
    this.fetchProduct(productId);
  },
  mounted() {
    this.$root.$on("toggleSideCart", () => {
      this.showSideCart = !this.showSideCart;
    });
  },
  methods: {
    async fetchProduct(productId) {
      axios.defaults.withCredentials = true;

      const result = await axios.get(
        "https://ec-website-api.herokuapp.com/api/products/" + productId
      );
      // const result = await axios.get(
      //   "http://localhost:3000/api/products/" + productId
      // );
      console.log(result.data);
      this.product = result.data.product;
      this.cart = result.data.cart;
    },
    handleAddToCart(productId, quantity) {
      axios.defaults.withCredentials = true;

      const vm = this;

      axios
        .post("https://ec-website-api.herokuapp.com/api/cart", {
          productId,
          quantity
        })
        // axios
        //   .post("http://localhost:3000/api/cart", {
        //     productId,
        //     quantity
        //   })
        .then(function(response) {
          vm.fetchProduct(productId);
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
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
          vm.fetchProduct(productId);
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>