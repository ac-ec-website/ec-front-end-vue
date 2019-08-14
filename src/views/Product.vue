<template>
  <div class="container py-5">
    <ProductDetail :product="product" />
  </div>
</template>

<script>
import axios from 'axios'
import ProductDetail from '../components/ProductDetail'

export default {
  components: {
    ProductDetail
  },
  data() {
    return {
      product: {}
    }
  },
  created() {
    const productId = this.$route.params.productId
    this.fetchProduct(productId)
  },
  methods: {
    async fetchProduct(productId) {
      const result = await axios.get('https://ec-website-api.herokuapp.com/api/products/' + productId)
      this.product = result.data.product
    }
  }
}
</script>