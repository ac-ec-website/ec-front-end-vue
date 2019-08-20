<template>
  <div
    class="position-absolute fixed"
    style="top: 0px; left: 0px; height: 100vh;width: 30vw; min-width: 350px;border-right: 1px solid gray; background-color: #f7f7f7; z-index: 100"
  >
    <div class="container py-5">
      <h4 class="mt-5">購物車</h4>
      <hr />
      <div class="w-100" v-for="item in initialCart.items" :key="item.id">
        <router-link
          :to="{ name: 'product', params: { productId: item.id }}"
        >{{item.name}} X {{item.CartItem.quantity}}</router-link>
        <div class="w-100 text-right">
          <button class="btn btn-danger" @click.stop.prevent="deleteItem(item.CartItem.id)">刪除</button>
        </div>

        <hr />
      </div>
      <router-link
        :to="{ name: 'cart', params: { cartId: initialCart.id }}"
        class="w-100 btn btn-danger"
      >訂單結帳</router-link>
      <!-- <router-link to="/cart" class="w-100 btn btn-danger">訂單結帳</router-link> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    initialCart: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      cart: {}
    };
  },
  methods: {
    deleteItem(cartItemId) {
      this.$emit("clickDeleteItem", this.initialCart.id, cartItemId);
    }
  }
};
</script>