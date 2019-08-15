<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col" width="300">操作</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="product in products" :key="product.id">
        <th scope="row">{{ product.id }}</th>
        <td>{{ product.name }}</td>

        <td class="d-flex justify-content-between">
          <router-link
            :to="{name: 'admin-product', params: {productId: product.id}}"
            class="btn btn-link"
          >Show</router-link>

          <router-link
            :to="{name: 'admin-product-edit', params: {productId: product.id}}"
            class="btn btn-link"
          >Edit</router-link>

          <button
            type="button"
            class="btn btn-link"
            @click.stop.prevent="deleteproduct(product.id)"
          >Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    initialProducts: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      products: this.initialProducts
    }
  },
  methods: {
    deleteproduct(productId) {
      this.products = this.products.filter(product => product.id !== productId)
    }
  }
}
</script> 