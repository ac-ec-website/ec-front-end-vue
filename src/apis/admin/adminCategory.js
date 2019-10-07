import { apiHelper } from '@/utils/helpers'

export default {
  getCategories() {
    return apiHelper.get(`/admin/categories`)
  },
  postCategory(name) {
    return apiHelper.post(`/admin/categories`, name)
  },
  putCategory(categoryId, name) {
    return apiHelper.put(`/admin/categories/${categoryId}`, name)
  },
  deleteCategory(categoryId) {
    return apiHelper.delete(`/admin/categories/${categoryId}`)
  }
}
