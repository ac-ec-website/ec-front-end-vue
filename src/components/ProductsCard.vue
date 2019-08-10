<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-4">
      <img class="card-img-top" :src="product.image" alt="Card image cap" width="286px" height="180px" />

      <div class="card-body">
        <p class="card-text title-wrap">
          <router-link :to="{ name: 'product', params: { id: product.id }}">{{ product.name }}</router-link>
        </p>

        <p class="card-text text-truncate">價格：{{ product.price }}</p>
        <p class="card-text">{{ product.description }}</p>
      </div>

      <div class="card-footer">
        <!-- <button v-if="product.isLiked" type="button" class="btn btn-danger btn-block" @click.stop.prevent="removeLike(product.id)">Unlike</button>
        <button v-else type="button" class="btn btn-primary btn-block" @click.stop.prevent="addLike(product.id)">Like</button>-->

        <button type="button" class="btn btn-danger btn-block" @click.stop.prevent="addToCart()">放入購物車</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialProduct: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      product: this.initialProduct
    }
  },
  methods: {
    // addLike() {
    //   this.product = {
    //     ...this.product,
    //     isLiked: true
    //   }
    // },
    // removeLike() {
    //   this.product = {
    //     ...this.product,
    //     isLiked: false
    //   }
    // },
    addToCart(id, qty) {
      const api = 'https://cool-shop-backend.herokuapp.com/api/cart'
      const vm = this
      const cart = {
        // 定義資料結構
        product_id: id,
        qty // 這是ｅs6 的屬性縮寫，原為 qty:qty
      }
      vm.axios.post(api, { data: cart }).then(response => {
        console.log(response)
        vm.$emit('updateCart')
        vm.$emit('message:push', response.data.message, 'warning')
      })
    }
  }
}
</script>