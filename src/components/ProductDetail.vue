<template>
  <div>
    <h1 class="py-3 font-weight-bold">{{product.name}}</h1>
    <div class="row">
      <div class="col-md-4 mb-5">
        <div class="w-100">
          <div
            style="width: 100%;padding-bottom: 100%;background-position: center;background-repeat: no-repeat;background-size: cover"
            :style="{ 'background-image': 'url(' + product.image + ')' }"
          ></div>
        </div>
      </div>
      <div class="col-md-8">
        <p>{{product.description}}</p>
        <hr />
        <span
          class="float-right text-secondary card-text text-truncate"
        >原價$ {{ product.origin_price }} 元</span>
        <h5
          class="card-text text-truncate font-weight-bold text-success"
        >NT$ {{ product.sell_price }} 元</h5>

        <div class="addToCart text-right py-5">
          <form @submit.stop.prevent="handleAddToCart">
            <div v-if="product.stock_quantity === 0" class="input-group">
              <button type="button" class="btn btn-secondary btn-block" disabled>商品已無庫存</button>
            </div>

            <div v-else class="input-group">
              <input
                v-model="productQuantity"
                type="number"
                name="quantity"
                class="form-control"
                min="1"
              />
              <div class="input-group-append">
                <button type="submit" class="btn btn-danger px-5">加入購物車</button>
              </div>
            </div>
          </form>
        </div>
        <a class="text-primary" style="cursor: pointer" @click="$router.go(-1)">回前一頁</a>
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
  data () {
    return {
      productQuantity: 1,
      product: this.initialProduct
    }
  },
  watch: {
    initialProduct: function () {
      this.product = this.initialProduct
    }
  },
  methods: {
    handleAddToCart () {
      console.log('加入商品數量', this.productQuantity)
      this.$emit('clickAddToCart', this.product.id, parseInt(this.productQuantity))
    }
  }
}
</script>
