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
        <span class="float-right text-secondary card-text text-truncate">原價$ {{ product.origin_price }} 元</span>
        <h5 class="card-text text-truncate font-weight-bold text-success">NT$ {{ product.sell_price }} 元</h5>
        <div class="addToCart text-right py-5">
          <form @submit.stop.prevent="handleAddToCart">
            <div class="input-group">
              <input v-model="productQuantity" type="number" name="quantity" class="form-control" min="1" />
              <div class="input-group-append">
                <button type="submit" class="btn btn-danger px-5">加入購物車</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    initialProduct: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      productQuantity: 1,
      product: {}
    }
  },
  mounted() {
    this.fetchProduct()
  },
  methods: {
    fetchProduct() {
      this.product = this.initialProduct
    },
    handleAddToCart() {
      axios
        .post('http://localhost:3000/api/cart', {
          productId: this.product.id,
          quantity: parseInt(this.productQuantity)
        })
        .then(function(response) {
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
}
</script>