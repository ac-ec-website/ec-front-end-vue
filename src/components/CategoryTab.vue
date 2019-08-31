<template>
  <div class="mb-3">
    <ul class="nav justify-content-center">
      <li class="nav-item mx-1">
        <a href="#" class="btn btn-outline-dark" @click.stop.prevent="filterCategory()">所有商品</a>
      </li>
      <li class="nav-item mx-1" v-for="category in categories" :key="category.id">
        <a href="#" class="btn btn-outline-dark" @click.stop.prevent="filterCategory(category.id)">{{category.name}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  methods: {
    filterCategory(categoryId) {
      this.$emit('filter-category', categoryId)
    }
  }
}
</script>

<style scoped>
ul > li > a:focus {
  background-color: #343a40;
  color: #ffffff;
}
</style>