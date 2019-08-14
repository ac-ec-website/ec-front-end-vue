<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-4">
      <div class="w-100">
        <div
          style="width: 100%;padding-bottom: 100%;background-position: center;background-repeat: no-repeat;background-size: cover"
          :style="{ 'background-image': 'url(' + product.image + ')' }"
        ></div>
      </div>

      <div class="card-body">
        <h4 class="card-text title-wrap font-weight-bold">
          <router-link
            :to="{ name: 'product', params: { productId: product.id }}"
            class="stretched-link"
          >{{ product.name }}</router-link>
        </h4>
        <p class="card-text">{{ product.description }}</p>
        <hr />
        <span
          class="float-right text-secondary card-text text-truncate"
        >原價$ {{ product.origin_price }} 元</span>
        <h5
          class="card-text text-truncate font-weight-bold text-success"
        >NT$ {{ product.sell_price }} 元</h5>
      </div>

      <div class="card-footer">
        <!-- <button v-if="product.isLiked" type="button" class="btn btn-danger btn-block" @click.stop.prevent="removeLike(product.id)">Unlike</button>
        <button v-else type="button" class="btn btn-primary btn-block" @click.stop.prevent="addLike(product.id)">Like</button>-->

        <button
          type="button"
          class="btn btn-danger btn-block"
          @click.stop.prevent="addToCart()"
        >放入購物車</button>
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
      const api = 'https://ec-website-api.herokuapp.com/api/cart'
      const vm = this
      const cart = {
        // 定義資料結構
        product_id: id,
        qty // 這是ｅs6 的屬性縮寫，原為 qty:qty
      }
      vm.axios.post(api, { data: cart }).then(response => {
        console.log(response)
        vm.$emit('updateCart')
      })
    }
  }
}
</script>