<template>
  <div class="row">
    <AdminNav class="sidebar col-md-2 d-none d-md-block bg-light" />

    <div class="container col-md-9 ml-sm-auto col-lg-10 px-4">
      <router-link to="/admin/products/new" class="btn btn-primary btn-block mb-4">
        New Products
        <i class="fas fa-plus-square"></i>
      </router-link>

      <AdminProductsTable />
    </div>
  </div>
</template>

<script>
import AdminNav from '@/components/admin/AdminNav'
import AdminProductsTable from '@/components/admin/AdminProductsTable'

export default {
  components: {
    AdminNav,
    AdminProductsTable
  }
}
</script>

<style scoped>
.container {
  margin: 50px;
}
</style>