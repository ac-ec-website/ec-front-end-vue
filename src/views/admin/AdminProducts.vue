<template>
  <div class="container py-5">
    <AdminNav />

    <router-link to="/admin/products/new" class="btn btn-primary mb-4">New Products</router-link>

    <AdminProductsTable />
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