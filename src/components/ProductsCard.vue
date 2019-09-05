<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-4">
      <div class="w-100">
        <router-link :to="{ name: 'product', params: { productId: product.id }}">
          <div
            style="width: 100%;padding-bottom: 100%;background-position: center;background-repeat: no-repeat;background-size: cover"
            :style="{ 'background-image': 'url(' + product.image + ')' }"
          ></div>
        </router-link>
      </div>

      <div class="card-body">
        <h4 class="card-text title-wrap font-weight-bold">
          <router-link
            :to="{ name: 'product', params: { productId: product.id }}"
          >{{ product.name }}</router-link>
        </h4>
        <span class="badge badge-secondary">{{product.Category.name}}</span>
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
        <div class="row">
          <div class="col px-1">
            <router-link
              :to="{ name: 'product', params: { productId: product.id }}"
              class="btn btn-primary btn-block"
            >商品資訊</router-link>
          </div>
          <div class="col">
            <button
              type="button"
              class="btn btn-danger btn-block"
              @click.stop.prevent="handleAddToCart(product.id,1)"
            >放入購物車</button>
          </div>
        </div>
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
    handleAddToCart(productId, quantity) {
      const vm = this
      vm.$emit('add-to-cart', productId, quantity)
    }
  }
}
</script>