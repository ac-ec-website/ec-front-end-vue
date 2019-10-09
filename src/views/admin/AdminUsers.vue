<template>
  <div class="row">
    <AdminNav class="sidebar col-md-2 d-none d-md-block bg-light" />

    <div class="container col-md-9 ml-sm-auto col-lg-10">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <th scope="row">{{user.id}}</th>
            <td>{{user.email}}</td>
            <td>
              <div v-show="user.isEditing">
                <div class="input-group">
                  <select class="custom-select" v-model="user.role">
                    <option>admin</option>
                    <option>user</option>
                  </select>
                </div>
              </div>
              <div v-show="!user.isEditing">{{user.role}}</div>
            </td>
            <td>
              <div v-if="user.isSelf"></div>
              <div v-else>
                <div v-show="user.isEditing">
                  <button class="btn btn-outline-dark btn-sm" @click="updateUserRole(user.id)">Done</button>
                </div>
                <div v-show="!user.isEditing">
                  <button
                    class="btn btn-outline-dark btn-sm"
                    @click.stop.prevent="editUserRole(user.id)"
                  >Edit</button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import adminUserAPI from '@/apis/admin/adminUser'
import AdminNav from '@/components/admin/AdminNav'
const { Toast } = require('../../utils/helpers')

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
      const { data, statusText } = await adminUserAPI.getUsers()

      this.users = data.user.map(user => {
        if (user.id === this.$store.state.currentUser.id) {
          return {
            ...user,
            isEditing: false,
            isSelf: true
          }
        }
        return {
          ...user,
          isEditing: false,
          isSelf: false
        }
      })
    },
    editUserRole(userId) {
      this.users = this.users.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            isEditing: true
          }
        }
        return user
      })
    },
    async updateUserRole(userId) {
      const vm = this
      let userRole = ''

      this.users = this.users.map(user => {
        if (user.id === userId) {
          userRole = user.role
          return {
            ...user,
            isEditing: false
          }
        }
        return user
      })

      const { data, statusText } = await adminUserAPI.putUser({
        id: userId,
        role: userRole
      })

      if (statusText === 'OK') {
        Toast.fire({
          type: 'success',
          title: '更新成功！'
        })
      }

      this.fetchUser()
    }
  }
}
</script>

<style scoped>
.container {
  margin: 50px;
}
</style>