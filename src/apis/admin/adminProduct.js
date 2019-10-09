import { apiHelper } from '@/utils/helpers'

export default {
  getProducts () {
    return apiHelper.get(`/admin/products`)
  },
  getProduct (productId) {
    return apiHelper.get(`/admin/products/${productId}`)
  },
  postProduct (formData) {
    return apiHelper.post(`/admin/products`, formData)
  },
  putProduct (productId, formData) {
    return apiHelper.put(`/admin/products/${productId}`, formData)
  },
  deleteProduct (productId) {
    return apiHelper.delete(`/admin/products/${productId}`)
  }
}
