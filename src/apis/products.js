import { apiHelper } from './../utils/helpers'

export default {
  getProducts() {
    return apiHelper.get(`/products`)
  },
  getProduct(productId) {
    return apiHelper.get(`/products/${productId}`)
  },
  deleteItem(cartId, cartItemId) {
    return apiHelper.delete(`/cart/${cartId}/cartItem/${cartItemId}`)
  }
}
