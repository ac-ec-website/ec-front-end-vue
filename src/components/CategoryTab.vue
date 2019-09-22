<template>
  <div class="mb-3">
    <ul class="nav justify-content-center">
      <label class="mx-1" @click.stop="filterCategory()">
        <input type="radio" value="所有商品" v-model="picked" class="d-none" />
        <div class="btn btn-outline-dark">所有商品</div>
      </label>
      <label
        v-for="category in categories"
        :key="category.id"
        class="mx-1"
        @click.stop="filterCategory(category.id)"
      >
        <input type="radio" :value="category.id" v-model="picked" class="d-none" />
        <div class="btn btn-outline-dark">{{category.name}}</div>
      </label>
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
  data() {
    return {
      picked: ''
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
ul > label > input:checked + div {
  background-color: #343a40;
  color: #ffffff;
}
</style>