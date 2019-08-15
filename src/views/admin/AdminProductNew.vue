<template>
  <div class="container py-5">
    <AdminProductForm @after-submit="handleAfterSubmit" />
  </div>
</template>

<script>
import AdminProductForm from '@/components/admin/AdminProductForm.vue'

export default {
  methods: {
    handleAfterSubmit(formData) {
      for (let [name, value] of formData.entries()) {
        console.log(name + ': ' + value)
      }
    }
  },
  components: {
    AdminProductForm
  }
}
</script> 