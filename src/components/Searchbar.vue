<template>
  <div class="mb-3 text-center">
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="來尋寶吧~" v-model="inputText" @keyup.enter="filterSearch" />
      <div class="input-group-append">
        <button class="btn btn-outline-dark" type="button" @click.stop.prevent="filterSearch">搜尋</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputText: ''
    }
  },
  methods: {
    filterSearch () {
      this.$emit('filter-search', this.inputText)
    }
  }
}
</script>
