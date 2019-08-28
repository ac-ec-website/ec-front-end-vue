<template>
  <div class="container py-5">
    <AdminNav />
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col" width="140">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>root@example.com</td>
          <td>admin</td>
          <td>
            <button type="button" class="btn btn-link">set as user</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from '@/components/admin/AdminNav'

export default {
  components: {
    AdminNav
  },
  data() {
    return {
      users: {}
    }
  },
  created() {
    this.fetchUser()
  },
  methods: {
    async fetchUser() {
      const vm = this
      const { data, statusText } = await vm.axios.get('http://localhost:3000/api/admin/users')
      console.log(data)
      this.users = data.users
    }
  }
}
</script> 