<template>
  <div class="row">
    <AdminNav class="sidebar col-md-2 d-none d-md-block bg-light" />

    <div class="container col-md-9 ml-sm-auto col-lg-10 px-4">
      <form class="my-4">
        <div class="form-row">
          <div class="col-auto">
            <input
              v-model="newCategoryName"
              type="text"
              class="form-control"
              placeholder=" 新增產品類別..."
            />
          </div>

          <div class="col-auto">
            <button
              type="button"
              class="btn btn-primary"
              :disabled="isProcessing"
              @click.stop.prevent="createCategory()"
            >
              New Category
              <i class="fas fa-plus-square"></i>
            </button>
          </div>
        </div>
      </form>

      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col" width="60">#</th>
            <th scope="col">Category</th>
            <th scope="col" width="250">Action</th>
          </tr>
        </thead>

        <Spinner v-if="isLoading" />

        <tbody v-else>
          <tr v-for="category in categories" :key="category.id">
            <th scope="row">{{ category.id }}</th>

            <td class="position-relative">
              <div v-show="!category.isEditing" class="category-name">{{ category.name }}</div>

              <input
                v-show="category.isEditing"
                v-model="category.name"
                type="text"
                class="form-control"
              />
              <span v-show="category.isEditing" class="cancel" @click="handleCancel(category.id)">✕</span>
            </td>

            <td class="d-flex justify-content-between">
              <button
                v-show="!category.isEditing"
                type="button"
                class="btn btn-link"
                @click.stop.prevent="toggleIsEditing(category.id)"
              >
                Edit
                <i class="fas fa-edit"></i>
              </button>

              <button
                v-show="category.isEditing"
                type="button"
                class="btn btn-link"
                @click.stop.prevent="updateCategory({ categoryId: category.id, name: category.name })"
              >
                Save
                <i class="fas fa-check"></i>
              </button>

              <button
                type="button"
                class="btn btn-link"
                @click.stop.prevent="deleteCategory(category.id)"
              >
                Delete
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import adminCategoryAPI from '@/apis/admin/adminCategory'
import AdminNav from '@/components/admin/AdminNav'
import Spinner from '@/components/Spinner'
import { Toast } from '@/utils/helpers'

export default {
  components: {
    AdminNav,
    Spinner
  },
  data() {
    return {
      newCategoryName: '',
      categories: [],
      isProcessing: false,
      isLoading: false
    }
  },
  created() {
    this.fetchCategories()
  },
  methods: {
    async fetchCategories() {
      const vm = this
      try {
        vm.isLoading = true
        const { data, statusText } = await adminCategoryAPI.getCategories()

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        vm.categories = data.categories.map(category => ({
          ...category,
          isEditing: false
        }))
        vm.isLoading = false
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: ' 無法取得產品類別，請稍後再試'
        })
      }
    },
    async createCategory() {
      const vm = this
      try {
        vm.isProcessing = true
        const { data, statusText } = await adminCategoryAPI.postCategory({ name: vm.newCategoryName })

        if (statusText !== 'OK' || data.status !== 'success') {
          throw new Error(statusText)
        }

        vm.categories.push({
          ...data.category,
          isEditing: false
        })
        vm.isProcessing = false
        vm.newCategoryName = ''
      } catch (error) {
        vm.isProcessing = false
        Toast.fire({
          type: 'error',
          title: ' 無法新增產品類別，請稍後再試'
        })
      }
    },
    async updateCategory({ categoryId, name }) {
      const vm = this
      try {
        const { data, statusText } = await adminCategoryAPI.putCategory(categoryId, { name })

        if (statusText !== 'OK' || data.status !== 'success') {
          throw new Error(statusText)
        }

        this.toggleIsEditing(categoryId)
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: ' 無法更新產品類別，請稍後再試'
        })
      }
    },
    async deleteCategory(categoryId) {
      const vm = this
      try {
        const { data, statusText } = await adminCategoryAPI.deleteCategory(categoryId)

        if (statusText !== 'OK' || data.status !== 'success') {
          throw new Error(statusText)
        }

        vm.categories = vm.categories.filter(category => category.id !== categoryId)
        Toast.fire({
          type: 'success',
          title: '該產品類別已刪除'
        })
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: ' 無法刪除該產品類別，請稍後再試'
        })
      }
    },
    toggleIsEditing(categoryId) {
      const vm = this

      vm.categories = vm.categories.map(category => {
        if (category.id !== categoryId) return category

        return {
          ...category,
          nameCached: category.name,
          isEditing: !category.isEditing
        }
      })
    },
    handleCancel(categoryId) {
      const vm = this

      vm.categories = vm.categories.map(category => {
        if (category.id !== categoryId) {
          return category
        }

        return {
          ...category,
          name: category.nameCached
        }
      })

      vm.toggleIsEditing(categoryId)
    }
  }
}
</script>

<style scoped>
.container {
  margin: 50px;
}

.category-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 100px;
  color: rgba(12, 61, 167, 0.815);
}

.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}
</style>