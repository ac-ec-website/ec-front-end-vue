<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-4">
      <img class="card-img-top" :src="restaurant.image" alt="Card image cap" width="286px" height="180px" />

      <div class="card-body">
        <p class="card-text title-wrap">
          <router-link :to="{ name: 'restaurant', params: { id: restaurant.id }}">{{ restaurant.name }}</router-link>
        </p>

        <p class="card-text text-truncate">原價：{{ restaurant.description }}</p>
        <p class="card-text text-truncate">特價：{{ restaurant.description }}</p>
      </div>

      <div class="card-footer">
        <button v-if="restaurant.isLiked" type="button" class="btn btn-danger btn-block" @click.stop.prevent="removeLike(restaurant.id)">Unlike</button>
        <button v-else type="button" class="btn btn-primary btn-block" @click.stop.prevent="addLike(restaurant.id)">Like</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialRestaurant: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      restaurant: this.initialRestaurant
    }
  },
  methods: {
    addLike() {
      this.restaurant = {
        ...this.restaurant,
        isLiked: true
      }
    },
    removeLike() {
      this.restaurant = {
        ...this.restaurant,
        isLiked: false
      }
    },
    addToCart(id, qty) {
      const vm = this
      const cart = {
        // 定義資料結構
        product_id: id,
        qty // 這是ｅs6 的屬性縮寫，原為 qty:qty
      }
      this.$http.post(url, { data: cart }).then(response => {
        console.log(response)
        vm.$emit('updateCart')
        vm.$emit('message:push', response.data.message, 'warning')
      })
    }
  }
}
</script>